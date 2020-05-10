import * as React from 'react';

import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';

export class HomeComponent extends React.Component {
    render() {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />

                <div>
                    <p>CHALLENGING FUNCTIONAL FITNESS GROUP TRAINING THAT WORKS.</p>
                    <p>ALL DURING THE BEST HOUR OF YOUR DAY.</p>
                </div>
            </div>
        );
    }
}
