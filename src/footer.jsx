import React from 'react';

function Footer() {
  return (
    <footer id='footer'>
      <p>"Coded with React.js + Powered by Vite"</p>
      <p>&copy; {new Date().getFullYear()} Jason. All rights reserved.</p>
    </footer>
  );
}

export default Footer;