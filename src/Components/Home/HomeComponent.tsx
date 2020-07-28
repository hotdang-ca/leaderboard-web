import * as React from 'react';

import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';
import './home.css';
import { DonateButton } from '../widgets/DonateButton';


export const HomeComponent: React.FC<any> = () => {

    return (
        <div className="page-container">
        <TopLogo />
        <MenuBar />

        <div className="home">
            <p>CHALLENGING FUNCTIONAL FITNESS GROUP TRAINING THAT WORKS.</p>
            <p>ALL DURING THE BEST HOUR OF YOUR DAY.</p>

            {/* <DonateButton /> */}
        </div>
    </div>
    )
}