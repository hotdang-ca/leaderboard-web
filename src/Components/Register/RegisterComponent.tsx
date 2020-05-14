import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';

import { UsersController } from '../../Utils/ApiController';
import { withRouter } from 'react-router-dom';

import './register.css';

interface IRegisterComponentState {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    teamName?: string;
    gymName?: string;

    errorMessage?: string;
}
class RegisterComponentClass extends React.Component<any, IRegisterComponentState> {
    constructor(props: any, state: IRegisterComponentState) {
        super(props, state);

        this.state = {}
    }

    private _handleRegisterSubmit = (e: any) => {
        e.preventDefault();

        this.setState({
            errorMessage: undefined,
        });
        
        const { firstName, lastName, password, email, teamName, gymName } = this.state;
        if (
            (!firstName || firstName.length < 2)
            || 
            (!lastName || lastName.length < 5)
            ||
            (!password || password.length < 8)
            || 
            (!email || email.length < 6)
        ) {
            this.setState({
                errorMessage: 'You need to fill out a first name, last name, password and email at minimum.'
            })
            return;
        }

        const userObject = {
            firstName,
            lastName,
            password,
            email,
            teamName,
            gymName,
        };

        UsersController.register(userObject).then((result: any) => {
            if (result.success) {
                const { user } = result;
                localStorage.setItem('com.reginavillains.leaderboards.userId', user.id);

                const { history } = this.props;
                history.push('/profile');
            }

            this.setState({
                errorMessage: result.error,
            })

        }).catch((error: string) => {
            this.setState({
                errorMessage: error,
            });
        });
    }

    public render(): JSX.Element {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />

                <h1>Register</h1>

                { this.state.errorMessage && 
                    <div className="error">
                        { this.state.errorMessage }
                    </div>
                }

                <form className="login-form">
                    <input type="text" placeholder="First Name" onChange={(e) => this.setState({ firstName: e.target.value })} />
                    <br/><input type="text" placeholder="Last Name" onChange={(e) => this.setState({ lastName: e.target.value })} />
                    <br/><input type="email" placeholder="Email Address" onChange={(e) => this.setState({ email: e.target.value })} />
                    <br/><input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                    <br/><input type="text" placeholder="Team Name" onChange={(e) => this.setState({ teamName: e.target.value })} />
                    <br/><input type="text" placeholder="Gym Name" onChange={(e) => this.setState({ gymName: e.target.value })} />
                    <br/>
                    <button type="submit" className="login-button" onClick={this._handleRegisterSubmit}>
                        Register
                    </button>
                </form>
                
            </div>
        );
    }
}

export const RegisterComponent = withRouter(RegisterComponentClass);