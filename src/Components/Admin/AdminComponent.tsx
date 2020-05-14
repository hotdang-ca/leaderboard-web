import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';
import { IndeterminateLoader } from '../widgets/IndeterminateLoader';
import { UsersController, DivisionsController, EventsController, ScoresController } from '../../Utils/ApiController';

import './admin.css';

interface IAdminComponentState {
    isLoading: boolean;

    users: any[];
    events: any[];
    divisions: any[];
    scores: any[];
}

export class AdminComponent extends React.Component<any, IAdminComponentState> {
    constructor(props: any, state: IAdminComponentState) {
        super(props, state);

        this.state = {
            users: [],
            events: [],
            divisions: [],
            scores: [],

            isLoading: false,
        }
    }

    public componentDidMount() {
        this._verify();

        this._fetchData();
    }

    private _fetchData = () => {
        this.setState({
            isLoading: true,
        });

        Promise.all([
            UsersController.getUsers(),
            DivisionsController.getDivisions(),
            EventsController.getAllEvents(),
            ScoresController.getAllScores(),
        ]).then(([ users, divisions, events, scores ]) => {
            this.setState({
                users,
                divisions,
                events,
                scores,
                isLoading: false,
            });
        });
    }

    private _verify = (): void => {
        const admin = localStorage.getItem('com.reginavillains.leaderboards.admin');
        const userId = localStorage.getItem('com.reginavillains.leaderboards.userId');

        if (!admin || !userId) {
            window.location.href = '/profile';
        }
    }

    private _renderLists = () => {
        const { users, divisions, events, scores } = this.state;
    
        const usersJsx = users.length === 0 ? <em>No users</em> : users.map((u: any) => {
            return (
                <tr key={u.id}>
                    <td>
                        { u.firstName }
                    </td>
                    <td>
                        { u.lastName }
                    </td>
                    <td>
                        { u.teamName || 'no team' }
                    </td>
                    <td>
                        { u.gymName || 'no gym' }
                    </td>
                    <td>
                        { u.email }
                    </td>
                    <td>
                        <small>
                            <button className="small">
                                Delete
                            </button>
                        </small>
                    </td>
                </tr>
            )
        });

        const divisionJsx = divisions.length === 0 ? <em>No divisions</em> : divisions.map((d: any) => {
            const eventsForDivision = events.filter((e) => e.division.toString() === d.id.toString());
            const scoresInDivision = scores.filter((s) => eventsForDivision.find((e) => e.id.toString() === s.event.toString()));

            return (
                <tr key={d.id}>
                    <td>
                        { d.name }
                    </td>
                    <td>
                        { eventsForDivision.length}
                    </td>
                    <td>
                        { scoresInDivision.length }
                    </td>
                    <td>
                        <small>
                            <button className="small">
                                Delete
                            </button>
                        </small>
                    </td>
                </tr>
            )
        });
        
        const eventsJsx = events.length === 0 ? <em>No events</em> : events.map((e: any) => {

            return (
                <tr key={e.id}>
                    <td>
                        { e.name }
                    </td>
                    <td>
                        { divisions.find((d) => d.id.toString() === e.division.toString()).name }
                    </td>
                    <td>
                        { scores.filter((s) => s.event.toString() === e.id.toString()).length }
                    </td>
                    <td>
                        <small>
                            <button className="small">
                                Delete
                            </button>
                        </small>
                    </td>
                </tr>    
            )
        });
        
        const scoresJsx = scores.length === 0 ? <em>No scores</em> : scores.map((s: any) => {
            const scoreUser = users.find((u) => u.id.toString() === s.user.toString());
            const scoreEvent = events.find((e) => e.id.toString() === s.event.toString());
            const scoreDivision = divisions.find((d) => d.id.toString() === scoreEvent.division.toString());

            return (
                <tr key={s.id}>
                    <td>
                        { s.score }
                    </td>
                    <td>
                        { s.place }
                    </td>
                    <td>
                        { scoreEvent.name }
                    </td>
                    <td>
                        { scoreDivision.name }
                    </td>
                    <td>
                        { scoreUser.firstName } { scoreUser.lastName }
                    </td>
                    <td>
                        { scoreUser.teamName || 'no team' } { scoreUser.gymName || 'no gym' }
                    </td>
                    <td>
                        <small>
                            <button className="small">
                                Delete
                            </button>
                        </small>
                    </td>
                </tr>
                
                // <li
                //     key={u.id}
                // >
                //     { users.find((user) => user.id.toString() === u.user.toString()).firstName } {users.find((user) => user.id.toString() === u.user.toString()).lastName } <br/>{u.score } (Place: {u.place})<br/>{ events.find((e) => e.id.toString() === u.event.toString()).name }
                // </li>
            )
        });
        
        return (
            <div className="admin-lists-container">
                <div>
                    <h2>Users</h2>
                    <div>
                        <table cellPadding={0} cellSpacing={0}>
                        <thead>
                            <tr>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Team Name</td>
                                <td>Gym Name</td>
                                <td>Email</td>
                                <td className="tools"></td>
                            </tr>
                        </thead>
                        { usersJsx}
                        </table>
                    </div>
                </div>

                <div>
                    <div>
                        <h2>Divisions</h2>
                        <table cellPadding={0} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Number of Events</td>
                                    <td>Number of Score Submissions</td>
                                    <td className="tools"></td>
                                </tr>
                            </thead>
                            { divisionJsx }
                        </table>
                    </div>
                </div>

                <div>
                    <div>
                        <h2>Events</h2>
                        <table cellPadding={0} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <td>
                                        Name
                                    </td>
                                    <td>
                                        Division
                                    </td>
                                    <td>
                                        Number of Scores
                                    </td>
                                    <td className="tools">

                                    </td>
                                </tr>
                            </thead>
                            { eventsJsx }
                        </table>
                    </div>
                </div>

                <div>
                    <div>
                        <h2>Scores</h2>
                        <table cellPadding={0} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <td>
                                        Score
                                    </td>
                                    <td>
                                        Place
                                    </td>
                                    <td>
                                        Event
                                    </td>
                                    <td>
                                        Division
                                    </td>
                                    <td>
                                        Athlete
                                    </td>
                                    <td>
                                        Affiliation
                                    </td>
                                    <td className="tools">

                                    </td>
                                </tr>
                            </thead>
                            { scoresJsx }
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    public render(): JSX.Element {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />
                <h1>
                    Admin
                </h1>
                <div>
                    { this.state.isLoading 
                        ? <IndeterminateLoader />
                        : this._renderLists()
                    }
                </div>
            </div>
        );
    }
}
