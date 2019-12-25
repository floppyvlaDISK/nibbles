import GameController from './GameController';
import ScoreDashboard from './ScoreDashboard';
import setupNibbles from './setupNibbles';

const { aNibbles, aSnake, aPubSub } = setupNibbles(document.getElementById('nibbles'));
const aGameController = new GameController(aNibbles);
const aScoreDashboard = new ScoreDashboard(document.getElementById('score-board'));

aPubSub.subscribe('SnakeScoreChanged', aScoreDashboard.render);
aScoreDashboard.render(aSnake.score);
aGameController.exec();
