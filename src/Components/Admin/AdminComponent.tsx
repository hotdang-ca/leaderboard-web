import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';

export class AdminComponent extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />
                <h1>
                    Admin
                </h1>
            </div>
        );
    }
}
