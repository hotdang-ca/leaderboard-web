import * as React from 'react';

import './footer.css';

export const Footer: React.FC<any> = ({}) => {
    return (
        <footer className="footer">
            <p><small>Another small project built with ❤️ by<br/>James Perih @ <a href="https://fourandahalfgiraffes.ca/">Four and A Half Giraffes, Ltd.</a></small></p>
            <p><small>Custom Software Development based in Regina, SK</small></p>
        </footer>
    );
}