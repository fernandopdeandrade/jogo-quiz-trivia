import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Ranking.css';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      storage: [],
      storageState: [
        {
          name: 'alguém',
          assertions: 2,
          gravatarEmail: 'email@qualquer.com',
          score: 180,
          token: 'eb785ccb31339a37c61b2acb5be5b599c13506d6d576799ebe39ca26c73e5ba8',
          picture: 'https://www.gravatar.com/avatar/d7fff362fb6e9efd9f5f2295452a241a',
        },
      ],
    };
  }

  componentDidMount() {
    const { storageState } = this.state;
    // const { dispatch } = this.props;
    const storageGet = JSON.parse(localStorage.getItem('ranking'));
    if (storageGet !== null) {
      // const numberMagic = 1000;
      const storageSort = storageGet.ranking.sort((a, b) => b.score - a.score);
      const filteredWinner = storageSort[0];
      const diferent = storageGet.ranking
        .filter((dife) => dife.name !== filteredWinner.name);
      const diferentSort = diferent.sort((a, b) => a.score - b.score);
      const newArr = [filteredWinner, ...diferentSort];
      this.setState({ storage: newArr });
      // setTimeout(() => {
      //   dispatch({ type: 'RANKING', ranking: newArr });
      // }, numberMagic);
    } else {
      this.setState({ storage: storageState });
    }
  }

  render() {
    const { history: { push } } = this.props;
    const { storage } = this.state;
    return (
      <div className="divRanking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="infoRanking">
          <div className="namePictureScore">
            {storage.map((player, index) => (
              <>
                <div className="playerRanking">
                  <strong>Nome do jogador:</strong>
                  <h2
                    id="playerName"
                    data-testid={ `player-name-${index}` }
                  >
                    {player.name}
                  </h2>
                </div>
                <img id="playerImage" src={ player.picture } alt={ player.name } />
                <div className="playerScore">
                  <strong>Pontuação final:</strong>
                  <h2
                    id="playerScore"
                    data-testid={ `player-score-${index}` }
                  >
                    {player.score}
                  </h2>
                </div>
              </>
            ))}
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => push('/') }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(Object),
  player: PropTypes.objectOf(Object),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
