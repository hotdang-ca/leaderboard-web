import * as React from 'react';
import villainsLogo from './villains-logo-tagline-full-color-rgb.svg';
import './home.css';

const leaderboardData = {
    divisions: {
        'division_a': {
            name: 'division a',
            events: {
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
                    }
                ],

            }
        },
        'division_b': {
            name: 'division b',

        }
    }
}
export class HomeComponent extends React.Component<any, any> {
    private _renderLeaderboard = (leaderboardData: any): JSX.Element => {
        return (
            <>

            </>
        );
    }

    public render(): JSX.Element {
        return (
            <div className="main-page">
                <img src={villainsLogo} className="villains-logo-main" />

                <div className="leaderboard">
                    <h3>Leaderboard</h3>
                    <div className="leaderboard-list">
                        <div className="leaderboard-class">
                            <article className="leaderboard-item">
                                <div className="rank">
                                    1
                                </div>
                                <div>
                                    <div className="team"> {/* team */}
                                        CROSSFIT TRURO
                                    </div>
                                    <div className="gym"> {/* gym */}
                                        CROSSFIT TRURO
                                    </div>
                                </div>
                                <div className="score"> {/* gym */}
                                    261
                                </div>
                            </article>

                            <article className="leaderboard-item">
                                <div className="rank">
                                    2
                                </div>
                                <div>
                                    <div className="team"> {/* team */}
                                        CROSSFIT TRURO
                                    </div>
                                    <div className="gym"> {/* gym */}
                                        CROSSFIT TRURO
                                    </div>
                                </div>
                                <div className="score"> {/* gym */}
                                    259
                                </div>
                            </article>
                        </div>
                        <div className="leaderboard-class">
                        <article className="leaderboard-item">
                                <div className="rank">
                                    1
                                </div>
                                <div>
                                    <div className="team"> {/* team */}
                                        CROSSFIT TRURO
                                    </div>
                                    <div className="gym"> {/* gym */}
                                        CROSSFIT TRURO
                                    </div>
                                </div>
                                <div className="score"> {/* gym */}
                                    261
                                </div>
                            </article>

                            <article className="leaderboard-item">
                                <div className="rank">
                                    2
                                </div>
                                <div>
                                    <div className="team"> {/* team */}
                                        CROSSFIT TRURO
                                    </div>
                                    <div className="gym"> {/* gym */}
                                        CROSSFIT TRURO
                                    </div>
                                </div>
                                <div className="score"> {/* gym */}
                                    259
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}