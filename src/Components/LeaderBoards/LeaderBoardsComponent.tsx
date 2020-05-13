import * as React from 'react';
import { TopLogo } from '../widgets/TopLogo';

import './leaderboards.css';
import { MenuBar } from '../widgets/MenuBar';
import { LeaderBoardItem } from './LeaderBoardItem';
import { LeaderboardsController } from '../../Utils/ApiController';

export interface IScoreData {
    place: number;
    userId: string;
    firstName: string;
    lastInitial: string;
    gender: 'M' | 'F' | 'W';
    teamName: string;
    gymName?: string;
    score: number;
    scoreId: number;
    eventName?: string;
    divisionName?: string;
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


interface ILeaderBoardsComponentState {
    division?: string;
    event?: string;
    leaderboardPayload?: ILeaderboardPayload;
    cumulativePayload?: ILeaderboardPayload;
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
        LeaderboardsController.getAll().then((leaderboardPayload: ILeaderboardPayload) => {
            const firstDivision = leaderboardPayload.divisions[0];
            const firstEvent = firstDivision.events[0];

            this.setState({
                division: firstDivision.name,
                event: firstEvent.name,
                leaderboardPayload,
            });
        })
        .catch((err) => {
            console.log('There was an error', err);
        });
    }

    private _renderLeaderboardItems = (leaderboardItems: IScoreData[] | undefined): JSX.Element | JSX.Element[] => {
        if (typeof(leaderboardItems) === 'undefined' || leaderboardItems.length === 0) {
            return <em>No score data to show.</em>
        }
        
        leaderboardItems
            .sort((a, b) => a.score - b.score)
            .forEach((i, idx) => i.place = (idx + 1));

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
            const { leaderboardPayload } = this.state;

            const optionJsx = leaderboardPayload?.divisions
                .find((d) => d.name === division)
                ?.events.map((event) => {
                    return (
                        <button
                            onClick={() => this.setState({ event: event.name })}
                            className='event-button'
                            key={event.name}
                        >
                            {event.name}
                        </button>
                    );
            });

            return (
                <div className="event-button-container">
                    { optionJsx }
                    <button
                        onClick={this._handleAllEventsClicked}
                        className="event-button event-button-all">
                            <strong>ALL (Cumulative)</strong>
                        </button>
                </div>
            );
        }
    }

    public _handleAllEventsClicked = () => {
        LeaderboardsController.getAll().then((leaderboardPayload: ILeaderboardPayload) => {
            this.setState({
                cumulativePayload: leaderboardPayload,
                event: 'all',
            });
        });
    }

    public _renderLeaderboard = (selectedEvent?: IEventData) => {
        if (!selectedEvent) {
            return <em>No event data</em>
        };

        const men = selectedEvent?.scores
            .filter((s) => s.gender === 'M')
            .sort((a, b) => a.place - b.place);

        const women = selectedEvent?.scores
            .filter((s) => s.gender === 'W' || s.gender === 'F')
            .sort((a, b) => a.place - b.place);

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

    private _calculateCumulative = (selectedDivision?: IDivision): IEventData => {
        const name = 'all';
        const scores = new Array() as IScoreData[];

        const defaultValue = {
            name, scores,
        };

        if (!selectedDivision) {
            return defaultValue;  
        } 

        const scoreData: Map<string,IScoreData> = new Map();

        selectedDivision.events.forEach((event) => {
             event.scores.forEach((score) => {
                const scoreUser = score.userId;
                const scoreScore = score.score;

                if (!scoreData.get(scoreUser)) {
                    scoreData.set(scoreUser, score);
                } else {
                    const existingScore = scoreData.get(scoreUser);
                    if (existingScore) {
                        scoreData.set(scoreUser, {...existingScore, score: existingScore.score += scoreScore});
                    }
                }
            });
        });

        scoreData.forEach((v, _) => {
           defaultValue.scores.push(v); 
        });

        return defaultValue;
    }

    public render(): JSX.Element {
        let { division, event, leaderboardPayload, cumulativePayload } = this.state;
        
        // TODO: this will come from the network
        const selectedDivision = event === 'all' 
        ? cumulativePayload?.divisions.find((d) => d.name === division)
        : leaderboardPayload?.divisions.find((d) => d.name === division);

        const selectedEvent = event === 'all'
            ? this._calculateCumulative(selectedDivision)
            : selectedDivision?.events.find((e) => e.name === event);

        return (
            <div className="page-container">
                <TopLogo />
                <MenuBar />
                
                { this._renderDivisionSelection() }
                { this._renderEventSelection(division) }
                { this._renderLeaderboard(selectedEvent as IEventData) }
                
            </div>
        );

    }
}