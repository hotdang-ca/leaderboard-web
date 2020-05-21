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

    private _canRegister = (): boolean => {
        const { firstName, lastName, password, email } = this.state;
        if (!firstName || !lastName || !password || !email) {
            return false;
        }

        return (firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0);
    }

    private _handleRegisterSubmit = (e: any) => {
        e.preventDefault();

        const { firstName, lastName, password, email, teamName, gymName } = this.state;

        if (!this._canRegister()) {
            const derivedErrorMessage = 'You must fill out ';
            const reasons = [];

            if (!firstName) {
                reasons.push('first name');
            }

            if (!lastName) {
                reasons.push('last name');
            }

            if (!email) {
                reasons.push('email address');
            }

            if (!password) {
                reasons.push('password');
            }

            this.setState({
                errorMessage: `${derivedErrorMessage} ${reasons.join(',')}`,
            });
            return;
        }

        this.setState({
            errorMessage: undefined,
        });
        
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
                    <button
                        type="submit"
                        className="login-button"
                        onClick={this._handleRegisterSubmit}
                        disabled={!this._canRegister()}
                    >
                        Register
                    </button>
                </form>
                
            </div>
        );
    }
}

export const RegisterComponent = withRouter(RegisterComponentClass);