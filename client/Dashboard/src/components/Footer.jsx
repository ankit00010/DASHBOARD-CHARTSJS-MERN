// Footer.js

import React from 'react';
import '../App.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    const authorName = 'Ankit Mishra';

    return (
        <div className="footer-container">
            <div className="footer-content">
                &copy; {currentYear} {authorName}. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;
