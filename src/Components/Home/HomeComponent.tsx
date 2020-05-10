import * as React from 'react';
import villainsLogo from './villains-logo-tagline-full-color-rgb.svg';
import './home.css';

type IScoreData = {
    place: number;
    firstName: string;
    lastInitial: string;
    gender: 'M' | 'F';
    teamName: string;
    gymName?: string;
    score: number;
}

type IEventData = {
    name: string;
    scores: IScoreData[];
}

type IDivision = {
    name: string;
    events: IEventData[];
}

type ILeaderboardPayload = {
    divisions: IDivision[];
}

const _leaderboardData: ILeaderboardPayload = {
    divisions: [
        {
            name: 'division a',
            events: [
                {                  
                    name: 'event a',
                    scores: [
                        {
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 259,
                        },
                        
                        {
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            place: 2,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            place: 3,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 259,
                        },
                        {
                            place: 4,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            place: 5,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            place: 6,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 259,
                        },
                        
                        {
                            place: 4,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            place: 5,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            place: 6,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 259,
                        },
                    ],
                },
                {                  
                    name: 'event b',
                    scores: [
                        {
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 400,
                        },
                        {
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 392,
                        },
                        {
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 199,
                        },
                        {
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 500,
                        },
                        {
                            place: 2,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 480,
                        },
                        {
                            place: 3,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 450,
                        }
                    ],
                }
            ]
        },
        {
            name: 'division b',
            events: [
                {                  
                    name: 'event c',
                    scores: [
                        {
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 100,
                        },
                        {
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 75,
                        },
                        {
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 50,
                        },
                        {
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 100,
                        },
                        {
                            place: 3,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 75,
                        },
                        {
                            place: 2,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 100,
                        }
                    ],
                },
                {                  
                    name: 'event d',
                    scores: [
                        {
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 175,
                        },
                        {
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 150,
                        },
                        {
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 100,
                        },
                        {
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 175,
                        },
                        {
                            place: 2,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 150,
                        },
                        {
                            place: 3,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 100,
                        }
                    ],
                }
            ]
        },
    ],
}

interface IHomeComponentState {
    division: string;
    event?: string;
}
export class HomeComponent extends React.Component<any, IHomeComponentState> {
    constructor(props: any, state: IHomeComponentState) {
        super(props, state);
        this.state = {
            division: '',
            event: '',
        }
    }

    private _renderLeaderboardItems = (leaderboardItems: IScoreData[] | undefined): JSX.Element => {
        if (typeof(leaderboardItems) === 'undefined') {
            return <em>No score data to show.</em>
        }

        const leaderboardJsx = leaderboardItems.map((l) => {
            return (
                <article className="leaderboard-item">
                    <div className="rank">
                        { l.place }
                    </div>
                    <div className="team-gym-container">
                        <div className="team"> {/* team */}
                            { l.teamName }
                        </div>
                        <div className="gym"> {/* gym */}
                            { l.gymName }
                        </div>
                    </div>
                    <div className="score"> {/* gym */}
                        { l.score }
                    </div>
                </article>
            );
        });

        return (
            <>
                { leaderboardJsx }
            </>
        );
    }

    private _renderDivisionSelection = (): JSX.Element => {
        // TODO: make styled like materialUi

        const optionJsx = _leaderboardData.divisions
            .map((d) => (
                <option key={d.name} value={d.name}>
                    {d.name}
                </option>
            ));

        return (
            <select onChange={(e: any) => this.setState({ division: e.target.value })}>
                <option value="">-- select a division --</option>
                { optionJsx }
            </select>
        )
    }

    private _renderEventSelection = (division?: string): JSX.Element | undefined => {
        if (!division?.length) {
            return;
        }

        if (division?.length) {
            const optionJsx = _leaderboardData.divisions
                .find((d) => d.name === division)
                ?.events.map((event) => {
                    return (
                        <option key={event.name} value={event.name}>{event.name}</option>
                    );
            });

            return (
                <select onChange={(e: any) => this.setState({ event: e.target.value })}>
                    <option value="">-- select an event --</option>
                    { optionJsx }
                </select>
            );
        }
    }

    public render(): JSX.Element {
        const { division, event } = this.state;
        
        const selectedDivision = _leaderboardData.divisions.find((d) => d.name === division);
        const selectedEvent = selectedDivision?.events.find((e) => e.name === event);

        const men = selectedEvent?.scores.filter((s) => s.gender === 'M').sort((a, b) => a.place - b.place);
        const women = selectedEvent?.scores.filter((s) => s.gender === 'F').sort((a, b) => a.place - b.place);;

        return (
            <div className="main-page">
                <img src={villainsLogo} className="villains-logo-main" />

                { this._renderDivisionSelection() }
                { this._renderEventSelection(division) }

                <div className="leaderboard">
                    <h3>Leaderboard</h3>
                    <div className="leaderboard-list">

                        <div className="leaderboard-class">
                            <h6>Men</h6>
                            { this._renderLeaderboardItems(men) }
                        </div>
                        
                        <div className="leaderboard-class">
                            <h6>Women</h6>
                            { this._renderLeaderboardItems(women) }
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}