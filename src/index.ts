import GameController from './GameController';
import CurrentScore from './CurrentScore';
import TopScoresList from './TopScoresList';
import setupNibbles from './setupNibbles';
import LocalStorageWrapper from './utils/LocalStorageWrapper';

const { aNibbles, aSnake, aPubSub } = setupNibbles(document.getElementById('nibbles'));
const gameController = new GameController(aNibbles);
const currentScore = new CurrentScore(document.getElementById('current-score'));
const topScoresList = new TopScoresList(
  document.getElementById('top-scores-list'),
  new LocalStorageWrapper(),
);

aPubSub.subscribe('SnakeScoreChanged', currentScore.render);
aPubSub.subscribe('SnakeDied', topScoresList.updateTopScores);
currentScore.render(aSnake.score);
topScoresList.render();
gameController.exec();
