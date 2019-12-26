import GameController from './GameController';
import CurrentScore from './CurrentScore';
import setupNibbles from './setupNibbles';

const { aNibbles, aSnake, aPubSub } = setupNibbles(document.getElementById('nibbles'));
const gameController = new GameController(aNibbles);
const currentScore = new CurrentScore(document.getElementById('score-board'));

aPubSub.subscribe('SnakeScoreChanged', currentScore.render);
currentScore.render(aSnake.score);
gameController.exec();
