import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';
import { UsersController } from '../../Utils/ApiController';
import { withRouter } from 'react-router-dom';

interface ILoginComponentState {
    email?: string,
    password?: string,
}

class LoginComponentClass extends React.Component<any, ILoginComponentState> {
    constructor(props: any, state: ILoginComponentState) {
        super(props, state);        
    }

    private _handleLoginSubmit = (e: any) => {
        e.preventDefault();

        const { email, password } = this.state;

        if (!email || !password) {
            alert('You must fill in the fields.');
            return;
        }

        UsersController.login(email, password).then((result: any) => {
            if (result) {
                const { user } = result;
                localStorage.setItem('com.reginavillains.leaderboards.userId', user.id);

                if (user.role === 'admin' ) {
                    localStorage.setItem('com.reginavillains.leaderboards.admin', 'true');
                }

                this.props.history.push('/profile');
            } else {
                alert(`Error: ${result.error}`);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    public render(): JSX.Element {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />
                <h1>Login</h1>
                
                <form>
                    <br/><input type="email" placeholder="Email Address" onChange={(e) => this.setState({ email: e.target.value })} />
                    <br/><input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                    <br/>
                    <button onClick={this._handleLoginSubmit}>
                        Log In
                    </button>
                </form>
            </div>
        );
    }
}

export const LoginComponent = withRouter(LoginComponentClass);
