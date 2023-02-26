import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Questions.css';
import { assertionsScore } from '../redux/actions';
// import { mockData } from '../tests/helpers/dataMock';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      indexQuests: 0,
      responsesTrue: false,
      activeNext: false,
      classWrong: 'wrong answerButton',
      classCorrect: 'correct answerButton',
      timer: 30,
      disabled: false,
      scoreState: 0,
      assertionsState: 0,
      answersIndex: 0,
      quests: [],
    };
    // dataMoch = mockData;
  }

  componentDidMount() {
    const { indexQuests } = this.state;
    const magicNumber = 1000;
    const token = localStorage.getItem('token');
    this.time = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, magicNumber);

    if (token !== null || indexQuests.length !== undefined) {
      this.funcQuests(indexQuests);
    } else {
      const { history: { push } } = this.props;
      return push('/');
    }
  }

  componentDidUpdate(prevState, otherState) {
    if (otherState.timer === 1) {
      this.setState({ disabled: true, activeNext: true });
      clearInterval(this.time);
    }
  }

  funcQuests = (indexQuest) => {
    const { results } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = results[indexQuest];
    const randomNumberMagic = 0.5;
    const arrQuests = [...incorrectAnswers, correctAnswer]
      .sort(() => Math.random() - randomNumberMagic);
    this.setState({ quests: arrQuests });
  };

  handleClick = () => {
    this.setState({ responsesTrue: true, activeNext: true });
  };

  handleAnswer = (difficulty) => {
    const ten = 10;
    const three = 3;
    const { dispatch } = this.props;
    const { timer } = this.state;
    let peso = 0;
    if (difficulty === 'easy') {
      peso = 1;
    } else if (difficulty === 'medium') {
      peso = 2;
    } else {
      peso = three;
    }
    this.setState((prev) => ({
      scoreState: prev.scoreState + (ten + (timer * peso)),
      assertionsState: prev.assertionsState + 1,
    }), () => {
      const { scoreState, assertionsState } = this.state;
      dispatch(assertionsScore(scoreState, assertionsState));
    });
  };

  handleNext = () => {
    const magic = 1000;
    this.setState((prevState) => (
      {
        answersIndex: prevState.answersIndex + 1,
        indexQuests: prevState.indexQuests + 1,
        responsesTrue: false,
        timer: 30,
        disabled: false,
      }), () => {
      const { indexQuests } = this.state;
      const { results } = this.props;
      if (indexQuests !== results.length) {
        this.funcQuests(indexQuests);
      }
    });

    clearInterval(this.time);
    this.time = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }, magic);
  };

  render() {
    const { history: { push }, results, name, score, gravatarEmail } = this.props;
    const {
      indexQuests,
      activeNext,
      classWrong,
      classCorrect,
      responsesTrue,
      timer,
      disabled,
      quests,
    } = this.state;

    if (indexQuests === results.length) {
      let ranking = [];
      const tokenToLocal = localStorage.getItem('token');
      const verifyLocalStorage = localStorage.getItem('ranking') || undefined;
      if (verifyLocalStorage !== undefined) {
        ranking = JSON.parse(localStorage.getItem('ranking'));
      }
      if (verifyLocalStorage === undefined) {
        const formatLocalStorage = {
          ranking: [
            { name, score, picture: `https://www.gravatar.com/avatar/${gravatarEmail}`, token: tokenToLocal },
          ],
        };
        localStorage.setItem('ranking', JSON.stringify(formatLocalStorage));
      } else {
        const newObj = { name, score, picture: `https://www.gravatar.com/avatar/${gravatarEmail}`, token: tokenToLocal };
        ranking.ranking.push(newObj);
        localStorage.setItem('ranking', JSON.stringify(ranking));
      }
      return push('/feedback');
    }

    const {
      correct_answer: correctAnswer,
      difficulty,
    } = results[indexQuests];
    return (
      <div className="divQuestions">
        <div className="divSpan">
          <strong>Timer:</strong>
          <span>{timer}</span>
        </div>
        <h3 data-testid="question-category">{results[indexQuests].category}</h3>
        <h2 data-testid="question-text">{results[indexQuests].question}</h2>
        <div className="divResponse" data-testid="answer-options">
          {quests
            .map(
              (ansewers, index) => {
                if (ansewers === correctAnswer) {
                  return (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      id="correct-answer"
                      className={
                        responsesTrue ? classCorrect : 'answerButton'
                      }
                      onClick={ () => {
                        this.handleClick();
                        this.handleAnswer(difficulty);
                      } }
                      disabled={ disabled }
                    >
                      {ansewers}
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    key={ `wrong-answer-${index}` }
                    data-testid={ `wrong-answer-${index}` }
                    id={ index }
                    disabled={ disabled }
                    className={
                      responsesTrue ? classWrong : 'answerButton'
                    }
                    onClick={ () => {
                      this.handleClick();
                    } }
                  >
                    {ansewers}
                  </button>
                );
              },
            )}
        </div>
        {
          activeNext ? (
            <button
              type="button"
              data-testid="btn-next"
              className="buttonNextQuestions"
              onClick={ this.handleNext }
            >
              Próxima pergunta
              {' '}
              <span role="img" aria-label="emoji">👉</span>
            </button>) : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (
  {
    player: { gravatarEmail, name, score, assertions,
      questions: { response_code: responseCode, results } },
  },
) => ({
  results,
  responseCode,
  score,
  assertions,
  name,
  gravatarEmail,
});

Questions.propTypes = {
  results: PropTypes.arrayOf(Object),
  correct_answer: PropTypes.string,
  incorrect_answer: PropTypes.arrayOf(String),
}.isRequired;

export default connect(mapStateToProps)(Questions);
