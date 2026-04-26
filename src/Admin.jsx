import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

const emptyForm = { name: '', description: '', previewImages: [''], files: [{ label: '', url: '' }] };

function Admin({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [submitStatus, setSubmitStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  async function fetchProjects() {
    const q = query(collection(db, 'projects'), orderBy('createdAt'));
    const snapshot = await getDocs(q);
    setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError('Invalid email or password.');
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  function updateFile(index, field, value) {
    const updated = form.files.map((f, i) => i === index ? { ...f, [field]: value } : f);
    setForm({ ...form, files: updated });
  }

  function addFile() {
    setForm({ ...form, files: [...form.files, { label: '', url: '' }] });
  }

  function removeFile(index) {
    setForm({ ...form, files: form.files.filter((_, i) => i !== index) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitStatus('');
    const validFiles = form.files.filter(f => f.url.trim() !== '');
    try {
      const validImages = form.previewImages.filter(u => u.trim() !== '');
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), {
          name: form.name,
          description: form.description,
          previewImages: validImages,
          files: validFiles
        });
        setEditingId(null);
        setSubmitStatus('Project updated successfully!');
      } else {
        await addDoc(collection(db, 'projects'), {
          name: form.name,
          description: form.description,
          previewImages: validImages,
          files: validFiles,
          createdAt: new Date()
        });
        setSubmitStatus('Project added successfully!');
      }
      setForm(emptyForm);
      fetchProjects();
    } catch (err) {
      setSubmitStatus('Error saving project. Try again.');
    }
  }

  function handleEdit(project) {
    setEditingId(project.id);
    // support old projects that only have a `link` field
    const files = project.files?.length
      ? project.files
      : [{ label: 'View Project', url: project.link || '' }];
    const previewImages = project.previewImages?.length
      ? project.previewImages
      : project.previewImage ? [project.previewImage] : [''];
    setForm({ name: project.name, description: project.description, previewImages, files });
    setSubmitStatus('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setSubmitStatus('');
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return;
    await deleteDoc(doc(db, 'projects', id));
    fetchProjects();
  }

  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Admin Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <input style={styles.input} type="email" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)} required />
            <input style={styles.input} type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)} required />
            {loginError && <p style={styles.error}>{loginError}</p>}
            <button style={styles.button} type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{editingId ? 'Edit Project' : 'Add Project'}</h2>
          <button style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} type="text" placeholder="Project Name"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <textarea style={{ ...styles.input, height: '100px', resize: 'vertical' }}
            placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} required />
          <label style={styles.sectionLabel}>Preview Images (optional)</label>
          {form.previewImages.map((url, i) => (
            <div key={i} style={styles.fileRow}>
              <input style={{ ...styles.input, flex: 1 }} type="text"
                placeholder="Screenshot URL"
                value={url} onChange={e => {
                  const updated = form.previewImages.map((u, j) => j === i ? e.target.value : u);
                  setForm({ ...form, previewImages: updated });
                }} />
              {url && <img src={url} alt="thumb" style={styles.previewThumb} onError={e => e.target.style.display = 'none'} />}
              {form.previewImages.length > 1 && (
                <button type="button" style={styles.removeBtn} onClick={() =>
                  setForm({ ...form, previewImages: form.previewImages.filter((_, j) => j !== i) })
                }>✕</button>
              )}
            </div>
          ))}
          <button type="button" style={styles.addFileBtn} onClick={() =>
            setForm({ ...form, previewImages: [...form.previewImages, ''] })
          }>+ Add another image</button>

          <label style={styles.sectionLabel}>Files / Links</label>
          {form.files.map((file, i) => (
            <div key={i} style={styles.fileRow}>
              <input style={{ ...styles.input, flex: 1 }} type="text"
                placeholder="Label (e.g. Report, Slides)"
                value={file.label} onChange={e => updateFile(i, 'label', e.target.value)} />
              <input style={{ ...styles.input, flex: 2 }} type="text"
                placeholder="URL or path (e.g. /poster.pdf)"
                value={file.url} onChange={e => updateFile(i, 'url', e.target.value)} />
              {form.files.length > 1 && (
                <button type="button" style={styles.removeBtn} onClick={() => removeFile(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" style={styles.addFileBtn} onClick={addFile}>+ Add another file</button>

          {submitStatus && (
            <p style={submitStatus.includes('Error') ? styles.error : styles.success}>
              {submitStatus}
            </p>
          )}
          <div style={styles.formBtns}>
            <button style={styles.button} type="submit">
              {editingId ? 'Save Changes' : 'Add Project'}
            </button>
            {editingId && (
              <button style={styles.cancelButton} type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {projects.length > 0 && (
          <div style={styles.projectList}>
            <h3 style={styles.listTitle}>Existing Projects</h3>
            {projects.map(p => (
              <div key={p.id} style={styles.projectRow}>
                <span style={styles.projectName}>{p.name}</span>
                <div style={styles.rowBtns}>
                  <button style={styles.editBtn} onClick={() => handleEdit(p)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  card: { background: 'linear-gradient(135deg, #141424, #10102a)', border: '2px solid #6a5acd', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '520px', boxShadow: '0 4px 20px rgba(106,90,205,0.4)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  title: { color: 'white', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  sectionLabel: { color: '#aaa', fontSize: '0.85rem' },
  input: { padding: '0.75rem', borderRadius: '6px', border: '1px solid #6a5acd', background: '#0d0d22', color: 'white', fontSize: '0.95rem', width: '100%', boxSizing: 'border-box' },
  previewThumb: { width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #6a5acd' },
  fileRow: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
  removeBtn: { background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', flexShrink: 0 },
  addFileBtn: { background: 'transparent', border: '1px dashed #6a5acd', color: '#7b68ee', borderRadius: '6px', padding: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' },
  formBtns: { display: 'flex', gap: '0.75rem' },
  button: { flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: 'linear-gradient(135deg, #483d8b, #6a5acd)', color: 'white', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' },
  cancelButton: { flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid #6a5acd', background: 'transparent', color: 'white', fontSize: '1rem', cursor: 'pointer' },
  logoutButton: { padding: '0.4rem 0.9rem', borderRadius: '6px', border: '1px solid #6a5acd', background: 'transparent', color: 'white', cursor: 'pointer' },
  error: { color: '#ff6b6b', margin: 0 },
  success: { color: '#69db7c', margin: 0 },
  projectList: { marginTop: '1.5rem', borderTop: '1px solid #6a5acd', paddingTop: '1rem' },
  listTitle: { color: '#aaa', fontSize: '0.9rem', marginBottom: '0.75rem', marginTop: 0 },
  projectRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1e1e3a' },
  projectName: { color: 'white', fontSize: '0.95rem' },
  rowBtns: { display: 'flex', gap: '0.5rem' },
  editBtn: { padding: '4px 12px', borderRadius: '4px', border: '1px solid #6a5acd', background: 'transparent', color: '#7b68ee', cursor: 'pointer', fontSize: '0.85rem' },
  deleteBtn: { padding: '4px 12px', borderRadius: '4px', border: '1px solid #ff6b6b', background: 'transparent', color: '#ff6b6b', cursor: 'pointer', fontSize: '0.85rem' },
};

export default Admin;
