import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';
import { IndeterminateLoader } from '../widgets/IndeterminateLoader';
import { UsersController, DivisionsController, EventsController, ScoresController } from '../../Utils/ApiController';
import Table from 'rc-table';

import './admin.css';

interface IAdminComponentState {
    isLoading: boolean;
    currentList: 'events' | 'users' | 'divisions' | 'scores';

    users: any[];
    events: any[];
    divisions: any[];
    scores: any[];
}

export class AdminComponent extends React.Component<any, IAdminComponentState> {
    constructor(props: any, state: IAdminComponentState) {
        super(props, state);

        this.state = {
            currentList: 'scores',
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

    private _handleDeleteScore = (scoreId: string): void => {
        if (window.confirm(`Delete score ${scoreId} ?`)) {
            ScoresController.deleteScore(scoreId).then(() => {
                this._fetchData();
            });
        }
    }

    private _renderScoresTable = () => {
        const { scores, users, events, divisions } = this.state;

        const columns = [
            {
                title: 'Score',
                dataIndex: 'score',
                key: 'score',
            },
            {
                title: 'Place',
                dataIndex: 'place',
                key: 'place',
            },
            {
                title: 'Event',
                dataIndex: 'event',
                key: 'event',
            },
            {
                title: 'Division',
                dataIndex: 'division',
                key: 'division',
            },
            {
                title: 'Athlete',
                dataIndex: 'athlete',
                key: 'athlete',
            },
            {
                title: 'Affiliation',
                dataIndex: 'affiliation',
                key: 'affiliation',
            },
            {
              title: 'Operations',
              dataIndex: '',
              key: 'operations',
              render: (s: any) => (
                <>
                    <button
                        className="small"
                        disabled={false}
                        onClick={() => this._handleDeleteScore(s.key)}
                    >
                        Delete
                    </button>
                </>
              ),
            },
        ];

        const data = scores.map((s) => {
            const scoreUser = users.find((u) => u.id.toString() === s.user.toString());
            const scoreEvent = events.find((e) => e.id.toString() === s.event.toString());
            const scoreDivision = divisions.find((d) => d.id.toString() === scoreEvent.division.toString());
    
            return {
                score: s.score,
                place: s.place,
                event: scoreEvent.name,
                division: scoreDivision.name,
                athlete: `${scoreUser.firstName} ${scoreUser.lastName}`,
                affiliation: `${scoreUser.teamName || 'no team' } / ${scoreUser.gymName || 'no gym' }`,
                key: s.id,
            }
        });

        return (
            <Table
                columns={columns}
                data={data}
                tableLayout="auto"
            />
        );
    }

    private _renderUsersTable = () => {
        const { users } = this.state;

        const columns = [
            {
              title: 'First Name',
              dataIndex: 'firstName',
              key: 'firstName',
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
              title: 'Team',
              dataIndex: 'teamName',
              key: 'teamName',
            },
            {
                title: 'Gym',
                dataIndex: 'gymName',
                key: 'gymName',
                width: 200,
            },
            {
                title: 'Number of Scores',
                dataIndex: 'numScores',
                key: 'numScores',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: 100,
                render: (v: any) => (
                    <a href={`mailto:${v}`}>{v}</a>
                )
            },
            {
              title: 'Operations',
              dataIndex: '',
              key: 'operations',
              render: () => (
                <>
                    <button
                        className="small"
                        disabled={true}
                    >
                        Edit
                    </button>

                    <button
                        className="small"
                        disabled={true}
                    >
                        Delete
                    </button>
                </>
              ),
            },
        ];

        const data = users.map((u) => {
            const { scores } = this.state;
            const userScores = scores.filter((s) => s.user.toString() === u.id.toString());

            return {
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email,
                teamName: u.teamName,
                gymName: u.gymName,
                numScores: userScores.length,
                key: u.id,
            }
        });

        return (
            <Table
                columns={columns}
                data={data}
                tableLayout="auto"
            />
        );
    }

    private _renderEventsTable = () => {
        const { divisions, scores, events } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Division',
                dataIndex: 'division',
                key: 'division',
            },
            {
                title: 'Scores Submitted',
                dataIndex: 'numScores',
                key: 'numScores',
            },
            {
                title: 'Operations',
                dataIndex: '',
                key: 'operations',
                render: (v: any) => (
                  <>
                    <button
                          className="small"
                          disabled={true}
                      >
                          Rename
                      </button>
                      <button
                          className="small"
                          disabled={true}
                      >
                          Delete
                      </button>
                  </>
                ),
              },
        ];

        const data = events.map((e: any) => {
            return {
                name: e.name,
                division: divisions.find((d) => d.id.toString() === e.division.toString()).name,
                numScores: scores.filter((s) => s.event.toString() === e.id.toString()).length,
                key: e.id,
            }
        });
        
        return (
            <Table
                columns={columns}
                data={data}
                tableLayout="auto"
            />
        );
    }

    private _renderDivisionsTable = () => {
        const { divisions, scores, events } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Number of Events',
                dataIndex: 'numEvents',
                key: 'numEvents',
            },
            {
                title: 'Number of Scores',
                dataIndex: 'numScores',
                key: 'numScores',
            },
            {
                title: 'Operations',
                dataIndex: '',
                key: 'operations',
                render: (v: any) => (
                  <>
                      <button
                          className="small"
                          disabled={true}
                      >
                          Rename
                      </button>
                      <button
                          className="small"
                          disabled={true}
                      >
                          Delete
                      </button>
                  </>
                ),
              },
        ];

        const data = divisions.map((d: any) => {
            const eventsForDivision = events.filter((e) => e.division.toString() === d.id.toString());
            const scoresInDivision = scores.filter((s) => eventsForDivision.find((e) => e.id.toString() === s.event.toString()));

            return {
                name: d.name,
                numEvents: eventsForDivision.length,
                numScores: scoresInDivision.length,
                key: d.id,
            }
        });
        
        return (
            <Table
                columns={columns}
                data={data}
                tableLayout="auto"
            />
        );
    }

    private _renderLists = () => {        
        return (
            <>
                <div className="admin-lists-menu">
                    <button
                        className="tab-link medium"
                        onClick={(e) => { e.preventDefault(); this.setState({ currentList: 'scores'}); } }
                    >
                        Scores
                    </button>
                                        
                    <button
                        className="tab-link medium"
                        onClick={() => this.setState({ currentList: 'users'})}
                    >  
                        Users
                    </button>
                    <button
                        className="tab-link medium"
                        onClick={() => this.setState({ currentList: 'divisions'})}
                    >
                        Divisions
                    </button>

                    <button
                        className="tab-link medium"
                        onClick={() => this.setState({ currentList: 'events'})}
                    >
                        Events
                    </button>
                </div>
                <div className="admin-lists-container">
                    <div className={`admin-list-panel ${ this.state.currentList === 'users' ? 'visible' : 'hidden'}`}>
                        { this._renderUsersTable() }
                    </div>
                    <div className={`admin-list-panel ${ this.state.currentList === 'divisions' ? 'visible' : 'hidden'}`}>
                        { this._renderDivisionsTable() }
                    </div>

                    <div className={`admin-list-panel ${ this.state.currentList === 'events' ? 'visible' : 'hidden'}`}>
                        { this._renderEventsTable() }
                    </div>
                    
                    <div className={`admin-list-panel ${ this.state.currentList === 'scores' ? 'visible' : 'hidden'}`}>
                        { this._renderScoresTable() }
                    </div>
                </div>
            </>
        )
    }

    public render(): JSX.Element {
        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />
                <div className="small-warning">
                    <p>You may try rotating your screen, or even better, use a desktop or tablet.<br/>But, there is a lot of data here and you're screen is too small to take it all in. ;)</p>
                </div>
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
