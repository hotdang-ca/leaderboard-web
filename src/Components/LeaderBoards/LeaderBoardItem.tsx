import * as React from 'react';
import './leaderboards.css';
import { IScoreData } from './LeaderBoardsComponent';

type ILeaderBoardItemProps = {
    score: IScoreData;
}

export const LeaderBoardItem: React.FC<ILeaderBoardItemProps> = 
({ score }) => (
    <article className="leaderboard-item">
        { 
            score.divisionName && 
            <div className="division-and-event">
                { score.divisionName }<br/>{score.eventName }
            </div>
        }
        <div className="rank">
            { score.place }
        </div>
        <div className="team-gym-container">
            <div className="team"> {/* name */}
                {score.firstName} { score.lastInitial }
            </div>
            <div className="gym"> {/* team/gym */}
                { score.teamName && score.teamName }
                { score.gymName && ` / ${ score.gymName || 'no gym' }`}
            </div>
        </div>
        <div className="score"> {/* gym */}
            { score.score || '---'}
        </div>
    </article>
);