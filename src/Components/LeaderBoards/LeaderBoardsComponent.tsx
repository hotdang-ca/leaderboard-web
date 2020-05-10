import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';

import './leaderboards.css';
import { MenuBar } from '../widgets/MenuBar';
import { LeaderBoardItem } from './LeaderBoardItem';

export interface IScoreData {
    place: number;
    firstName: string;
    lastInitial: string;
    gender: 'M' | 'F';
    teamName: string;
    gymName?: string;
    score: number;
    scoreId: number;
};

type IEventData = {
    name: string;
    scores: IScoreData[];
};

type IDivision = {
    name: string;
    events: IEventData[];
};

type ILeaderboardPayload = {
    divisions: IDivision[];
};

const _leaderboardData: ILeaderboardPayload = {
    divisions: [
        {
            name: 'division a',
            events: [
                {                  
                    name: 'event a',
                    scores: [
                        {
                            scoreId: 1,
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            scoreId: 2,
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            scoreId: 3,
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 259,
                        },
                        {
                            scoreId: 4,
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            scoreId: 5,
                            place: 2,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            scoreId: 6,
                            place: 3,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 259,
                        },
                        {
                            scoreId: 7,
                            place: 4,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            scoreId: 8,
                            place: 5,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            scoreId: 9,
                            place: 6,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 259,
                        },
                        {
                            scoreId: 10,
                            place: 4,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 261,
                        },
                        {
                            scoreId: 11,
                            place: 5,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 260,
                        },
                        {
                            scoreId: 12,
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
                            scoreId: 13,
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 400,
                        },
                        {
                            scoreId: 14,
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 392,
                        },
                        {
                            scoreId: 15,
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 199,
                        },
                        {
                            scoreId: 16,
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 500,
                        },
                        {
                            scoreId: 17,
                            place: 2,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 480,
                        },
                        {
                            scoreId: 18,
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
                            scoreId: 19,
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 100,
                        },
                        {
                            scoreId: 20,
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 75,
                        },
                        {
                            scoreId: 21,
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 50,
                        },
                        {
                            scoreId: 22,
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 100,
                        },
                        {
                            scoreId: 23,
                            place: 3,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 75,
                        },
                        {
                            scoreId: 24,
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
                            scoreId: 25,
                            place: 1,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 175,
                        },
                        {
                            scoreId: 26,
                            place: 2,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 150,
                        },
                        {
                            scoreId: 27,
                            place: 3,
                            firstName: 'James',
                            lastInitial: 'P',
                            gender: 'M',
                            teamName: 'THE BOX ROGUES',
                            gymName: 'THE BOX - CROSSFIT TAUNTON',
                            score: 100,
                        },
                        {
                            scoreId: 28,
                            place: 1,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'Crossfit Truro',
                            gymName: 'Crossfit Truro',
                            score: 175,
                        },
                        {
                            scoreId: 29,
                            place: 2,
                            firstName: 'Dara',
                            lastInitial: 'P',
                            gender: 'F',
                            teamName: 'CFA Misfits',
                            gymName: 'CROSSFIT ASCOT',
                            score: 150,
                        },
                        {
                            scoreId: 30,
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

interface ILeaderBoardsComponentState {
    division?: string;
    event?: string;
    leaderboardPayload?: ILeaderboardPayload;
}

export class LeaderBoardsComponent extends React.Component<any, ILeaderBoardsComponentState> {
    constructor(props: any, state: ILeaderBoardsComponentState) {
        super(props, state);
        this.state = {}
    }

    public componentDidMount() {
        this._fetchData();
    }

    private _fetchData(): void {
        const firstDivision = _leaderboardData?.divisions[0];
        const firstEvent = firstDivision?.events[0];

        this.setState({
            division: firstDivision.name,
            event: firstEvent.name,
            leaderboardPayload: _leaderboardData,
        });
    }

    private _renderLeaderboardItems = (leaderboardItems: IScoreData[] | undefined): JSX.Element | JSX.Element[] => {
        if (typeof(leaderboardItems) === 'undefined') {
            return <em>No score data to show.</em>
        }

        return leaderboardItems
            .map((l) => <LeaderBoardItem key={l.scoreId} score={l} />)
    }

    private _renderDivisionSelection = (): JSX.Element => {
        const { leaderboardPayload } = this.state;

        const optionJsx = leaderboardPayload?.divisions
            ?.map((d) => (
                <option key={d.name} value={d.name}>
                    {d.name}
                </option>
            ));
        
        const divisionChanged = (e: any) => {
            const selectedDivision = leaderboardPayload?.divisions.find((d) => d.name === e.target.value);
            this.setState({
                division: selectedDivision?.name,
                event: selectedDivision?.events[0].name,
            });
        };
        
        return (
            <select
                value={this.state.division}
                onChange={divisionChanged}
            >
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
                <select value={this.state.event} onChange={(e: any) => this.setState({ event: e.target.value })}>
                    { optionJsx }
                </select>
            );
        }
    }

    public _renderLeaderboard = (selectedEvent?: IEventData) => {
        if (!selectedEvent) {
            return <em>No event data</em>
        };

        const men = selectedEvent?.scores
            .filter((s) => s.gender === 'M')
            .sort((a, b) => a.place - b.place);

        const women = selectedEvent?.scores
            .filter((s) => s.gender === 'F')
            .sort((a, b) => a.place - b.place);;

        return (
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
        );
    }

    public render(): JSX.Element {
        const { division, event } = this.state;
        
        // TODO: this will come from the network
        const selectedDivision = _leaderboardData.divisions.find((d) => d.name === division);
        const selectedEvent = selectedDivision?.events.find((e) => e.name === event);

        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />
                
                { this._renderDivisionSelection() }
                { this._renderEventSelection(division) }
                { this._renderLeaderboard(selectedEvent) }
                
            </div>
        );

    }
}