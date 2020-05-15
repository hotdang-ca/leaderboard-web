import * as React from 'react';

export const DonateButton: React.FC<any> = ({}) => {
    return (
        <div className="donate">
            <h2>
                DONATE TO YOUR FAVORITE LOCAL NON-PROFIT!
            </h2>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="FRSR8MRSPZKNW" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" src="https://www.paypal.com/en_CA/i/scr/pixel.gif" width="1" height="1" />
            </form>
        
            <p>
                <strong>** State Your Preferred Local Non-Profit in the Notes When Donating **</strong>
            </p>
             
            
        </div>
    );
}