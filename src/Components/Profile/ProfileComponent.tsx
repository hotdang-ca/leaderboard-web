import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';
import { UsersController } from '../../Utils/ApiController';

import './profile.css';

interface IProfileComponentState {
    firstName: string;
    lastName: string;
    gender: 'M' | 'F' | '';
    teamName: string;
    gymName: string;
    email: string;

    statusMessage?: string;
    isLoading: boolean;
}

export class ProfileComponent extends React.Component<any, IProfileComponentState> {
    constructor(props: any, state: IProfileComponentState) {
        super(props, state);
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            teamName: '',
            gymName: '',
            email: '',
            isLoading: false,
        }
    }
    public componentDidMount() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            window.location.href="/";
            return;
        }

        UsersController.getProfile(userId).then((user) => {
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender: user.gender,
                teamName: user.teamName,
                gymName: user.gymName,
            });
        });
    }

    private _handleUpdateProfileClicked = (e: any) => {
        e.preventDefault();

        this.setState({
            statusMessage: undefined,
        });
        
        const { firstName, lastName, gender, teamName, gymName } = this.state;
        const userId = localStorage.getItem('userId');

        UsersController.updateProfile(userId, {
            firstName,
            lastName,
            gender,
            teamName,
            gymName,
        }).then((result) => {
            this.setState({
                statusMessage: 'Updated your profile successfully!',
            });
        });
    }

    private _renderProfileForm = () => {
        return (
            <div>
                <h2>Update Profile</h2>
                <label htmlFor="firstName">First Name: </label>
                <input
                    onChange={(e: any) => this.setState({ firstName: e.target.value })}
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={this.state.firstName || ''}
                />
                <br/>
                <label htmlFor="lastName">Last Name: </label>
                <input
                    onChange={(e: any) => this.setState({ lastName: e.target.value })}
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastName || ''}
                />
                <br/>
                <label htmlFor="email">Email: </label>
                <input
                    onChange={(e: any) => this.setState({ email: e.target.value })}
                    id="email"
                    disabled={true}
                    type="email" 
                    placeholder="Email" value={this.state.email || ''} 
                />
                <br/>
                <label htmlFor="gender">Division: </label>
                <select
                    onChange={(e: any) => this.setState({ gender: e.target.value })}
                    id="gender"
                    value={this.state.gender || ''}
                >
                    <option value="M">Men's</option>
                    <option value="W">Women's</option>
                </select>
                <br/>
                <label htmlFor="teamName">Your Team Name: </label>
                <input
                    onChange={(e: any) => this.setState({ teamName: e.target.value })}
                    id="teamName"
                    type="text"
                    placeholder="Team Name"
                    value={this.state.teamName || ''}
                />
                <br/>
                <label htmlFor="gymName">Your Gym Name (optional): </label>
                <input
                    onChange={(e: any) => this.setState({ gymName: e.target.value })}
                    id="gymName"
                    type="text"
                    placeholder="Gym Name"
                    value={this.state.gymName || ''}
                />
                <br/>
                <button onClick={this._handleUpdateProfileClicked}>Update</button>
            </div>
        );
    }

    private _renderScoreSubmissionForm = () => {
        return (
            <div>
                <h2>Submit Score</h2>
            </div>
        );
    }

    public render(): JSX.Element {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />
                <h1>Profile</h1>

                { this.state.statusMessage &&
                    <div className="status-message">
                        { this.state.statusMessage }
                    </div>
                }
                <div className="two-column-divs">
                    { this._renderProfileForm() }
                    { this._renderScoreSubmissionForm() }
                </div>
                
            </div>
        )
    }
}