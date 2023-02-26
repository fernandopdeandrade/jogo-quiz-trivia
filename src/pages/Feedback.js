import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  render() {
    const { assertions, score, history: { push } } = this.props;
    const three = 3;
    return (
      <div className="feedBack">
        <Header />
        <div className="messageFeedback">
          {assertions >= three
            ? <h1 data-testid="feedback-text">Well Done!</h1>
            : <h1 data-testid="feedback-text">Could be better...</h1>}
          <div className="scoreAssertions">
            <div className="score">
              <p>Total de pontos:</p>
              <p data-testid="feedback-total-score">{score}</p>
            </div>
            <div className="assertions">
              <p>Número de acertos:</p>
              <p data-testid="feedback-total-question">{assertions}</p>
            </div>
          </div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => push('/') }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
