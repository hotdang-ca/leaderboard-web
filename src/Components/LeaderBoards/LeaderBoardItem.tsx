import * as React from 'react';
import './leaderboards.css';
import { IScoreData } from './LeaderBoardsComponent';

type ILeaderBoardItemProps = {
    score: IScoreData;
}

export const LeaderBoardItem: React.FC<ILeaderBoardItemProps> = 
({ score }) => (
    <article className="leaderboard-item">
        <div className="rank">
            { score.place }
        </div>
        <div className="team-gym-container">
            <div className="team"> {/* team */}
                { score.teamName }
            </div>
            <div className="gym"> {/* gym */}
                { score.gymName }
            </div>
        </div>
        <div className="score"> {/* gym */}
            { score.score }
        </div>
    </article>
);