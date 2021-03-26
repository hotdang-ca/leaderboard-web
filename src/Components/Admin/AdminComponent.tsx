import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';
import { MenuBar } from '../widgets/MenuBar';
import { IndeterminateLoader } from '../widgets/IndeterminateLoader';
import { UsersController, DivisionsController, EventsController, ScoresController } from '../../Utils/ApiController';
import Table from 'rc-table';

import './admin.css';
import editIcon from './edit-icon.png';

interface IAdminComponentState {
    isLoading: boolean;
    currentList: 'events' | 'users' | 'divisions' | 'scores';

    users: any[];
    events: any[];
    divisions: any[];
    scores: any[];

    editingEventTitle?: string;
    editingEventDivision?: string;
    editingEventSortType?: 'a-to-b' | 'b-to-a';
    editingEventId?: string;
    editingEventColumn?: 'rank' | 'name';

    isAddingDivision: boolean;
    newDivisionName: string;

    isAddingEvent: boolean;
    newEventName: string;
    newEventRankType: '' | 'a-to-b' | 'b-to-a';
    newEventDivision: string;

    updateMessage?: string;
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

            isAddingDivision: false,
            newDivisionName: '',

            isAddingEvent: false,
            newEventName: '',
            newEventDivision: '',
            newEventRankType: '',
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
                updateMessage: undefined,
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
    
    private _handleDeleteDivision = (divisionId: string): void => {
        const { divisions } = this.state;
        const division = divisions.find((d) => d.id === divisionId);

        if (window.confirm(`Delete division ${division.name}?`)) {
            DivisionsController.deleteDivision(divisionId).then((response) => {
                if (response.status === 204) {
                    this._fetchData();
                    return;
                }

                window.alert(`Could not delete division: ${response.message}`);
            })
        }
    }

    private _handleDeleteEvent = (eventId: string): void => {
        const { events } = this.state;
        const event = events.find((e) => e.id === eventId);

        if (window.confirm(`Delete event ${event.name}?`)) {
            EventsController.deleteEvent(event.id).then((response) => {
                if (response.status === 204) {
                    this._fetchData();
                    return;
                }

                window.alert(`Could not delete event: ${response.message}`);
            }).catch((err) => {
                debugger; 
            });
        }
    }

    private _handleNewDivisionClicked = (): void => {
        this.setState({ isLoading: true });
        DivisionsController.createDivision(this.state.newDivisionName).then((_: any) => {
            this.setState({
                newDivisionName: '',
            }, () => {
                this._fetchData();
            });
        });
    }

    private _handleNewEventClicked = (): void => {
        this.setState({isLoading: true});
        EventsController.createEvent({
            name: this.state.newEventName,
            division: this.state.newEventDivision,
            rankType: this.state.newEventRankType
        }).then((_: any) => {
            this.setState({
                newEventDivision: '',
                newEventName: '',
                newEventRankType: 'a-to-b',
            }, () => {
                this._fetchData();
            });
        });
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
                title: 'Gender Class',
                dataIndex: 'genderClass',
                key: 'genderClass',
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
            const genderToString = (gender: string): string | JSX.Element => {
                switch (gender) {
                    case 'M':
                        return 'Men\'s';
                    case 'W':
                        return 'Women\'s';
                    default:
                        return <em>Not set</em>;
                }
            }

            return {
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email,
                genderClass: genderToString(u.gender),
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

    private _handleEventRankTypeEdited = () => {
        const { editingEventSortType, editingEventId, editingEventColumn } = this.state;
        if (!editingEventSortType) {
            this.setState({
                editingEventId: undefined,
            });
            return;
        }

        EventsController.update(editingEventId, { rankType: editingEventSortType }).then((result: any) => {
            this.setState({
                updateMessage: 'Updated. Refreshing...',
                editingEventId: undefined,
                editingEventSortType: undefined,
            }, () => {                
                setTimeout(() => {
                    // TODO: just replace in list of events
                    this._fetchData();
                }, 750 );
            });
        });
    }

    private _handleEventTitleEdited = () => {
        const { editingEventTitle, editingEventId } = this.state;
        if (!editingEventTitle) {
            this.setState({
                editingEventId: undefined,
            });
            return;
        }

        EventsController.update(editingEventId, { name: editingEventTitle }).then((result: any) => {
            this.setState({
                updateMessage: 'Updated. Refreshing...',
                editingEventId: undefined,
                editingEventTitle: undefined,
                editingEventColumn: undefined,
            }, () => {                
                setTimeout(() => {
                    // TODO: just replace in list of events
                    this._fetchData();
                }, 750 );
            });
        });
    }

    private _renderEventsTable = () => {
        const {
            divisions,
            scores,
            events,
            editingEventDivision,
            editingEventSortType,
            editingEventColumn,
            editingEventTitle,
            editingEventId,
        } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (v: any, o: any) => {
                    if (editingEventId === o.key && editingEventColumn === 'name') {
                        return (
                            <div className="editing">
                                <input type="text" value={editingEventTitle || v} onChange={(e) => this.setState({ editingEventTitle: e.target.value })} />
                                <button
                                    onClick={this._handleEventTitleEdited} 
                                    className="small"
                                >
                                    Save
                                </button>
                            </div>
                        )
                    }

                    return (
                        <div className="editing">
                            <span>{v}</span>
                            <span tabIndex={0} onClick={() => this.setState({ editingEventId: o.key, editingEventColumn: 'name' })}>
                                <img src={editIcon} className="edit-icon" alt="Edit"/>
                            </span>
                        </div>
                    )
                }
            },
            {
                title: 'Rank Type',
                dataIndex: 'rankType',
                key: 'rankType',
                render: (v: any, o: any) => {
                    if (editingEventId === o.key && editingEventColumn === 'rank') {
                        return (
                            <div className="editing">
                                <select value={editingEventSortType || v} onChange={(e) => this.setState({ editingEventSortType: e.target.value as | 'a-to-b' | 'b-to-a' })}>
                                    <option value="">-- select sort type --</option>
                                    <option value="a-to-b">Lowest Score</option>
                                    <option value="b-to-a">Highest Score</option>
                                </select>
                                <button
                                    onClick={this._handleEventRankTypeEdited} 
                                    className="small"
                                >
                                    Save
                                </button>
                            </div>
                        )
                    }

                    return (
                        <div className="editing">
                            <span>
                                {v === 'a-to-b' ? 'Lowest Score' : 'Highest Score'}
                            </span>
                            <span tabIndex={0} onClick={() => this.setState({ editingEventId: o.key, editingEventColumn: 'rank' })}>
                                <img src={editIcon} className="edit-icon" alt="Edit"/>
                            </span>
                        </div>
                    )
                }
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
                render: (e: any) => (
                  <>
                      <button
                          className="small"
                          onClick={() => this._handleDeleteEvent(e.key)}
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
                rankType: e.rankType,
                key: e.id,
            }
        });
        
        return (
            <>
                <button 
                    className="small"
                    onClick={() => this.setState({ isAddingEvent: !this.state.isAddingEvent })}
                >
                    Add Event
                </button>
                {
                    this.state.isAddingEvent &&
                    <div>
                        <input type="text" placeholder="Event Name" onChange={(e) => this.setState({ newEventName: e.target.value }) }/>
                        <select
                            onChange={(e) => this.setState({ newEventDivision: e.target.value })}
                        >
                            <option value=""> -- select a division -- </option>
                            {
                                this.state.divisions.map((division) => {
                                    return (
                                        <option
                                            key={division.id} 
                                            value={division.id}
                                        >
                                            {division.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <select
                            onChange={(e) => this.setState({ newEventRankType: e.target.value === '' ? '' : e.target.value === 'a-to-b' ? 'a-to-b' : 'b-to-a' })}
                        >
                            <option value="a-to-b">Lowest-to-Highest</option>
                            <option value="b-to-a">Highest-To-Lowest</option>
                        </select>
                        <button
                            className="medium"
                            onClick={this._handleNewEventClicked}
                        >
                            Add Event
                        </button>
                    </div>
                }
                <Table
                    columns={columns}
                    data={data}
                    tableLayout="auto"
                />
            </>
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
                render: (d: any) => (
                  <>
                      <button
                          className="small"
                          disabled={true}
                      >
                          Rename
                      </button>
                      <button
                          className="small"
                          disabled={false}
                          onClick={() => this._handleDeleteDivision(d.key)}
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
            <>
            <button
                className="small"
                onClick={() => this.setState({
                    isAddingDivision: !this.state.isAddingDivision
                })}
            >
                Add Division
            </button>
            { 
                this.state.isAddingDivision && 
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flexStart'}}>
                    Add division
                    <label htmlFor="addDivisionName">Name</label>
                    <input
                        id="addDivisionName"
                        type="text"
                        placeholder="Name"
                        onChange={(e: any) => this.setState({ newDivisionName: e.target.value })}
                    />
                    <button
                        disabled={!this.state.newDivisionName.length}
                        className="medium"
                        onClick={this._handleNewDivisionClicked}
                    >
                        Save New Division
                    </button>
                </div>
                
            }

            <Table
                columns={columns}
                data={data}
                tableLayout="auto"
            />
            </>
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
                
                {
                    this.state.updateMessage && 
                    <div className="status-message">{this.state.updateMessage }</div>
                }

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
