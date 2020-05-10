import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';

export class RegisterComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />

                <h1>Register</h1>
            </div>
        );
    }
}