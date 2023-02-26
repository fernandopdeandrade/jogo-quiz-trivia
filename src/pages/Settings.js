import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSettings } from '../redux/actions';
import '../styles/Settings.css';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      triviaAmount: '',
      trivia_category: '',
      trivia_difficulty: '',
      trivia_type: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatch, history: { push } } = this.props;
    dispatch(userSettings(true, this.state));
    push('/');
  };

  render() {
    return (
      <div className="settings">
        <form className="form-api">
          <h1 data-testid="settings-title">Configurações</h1>
          <label htmlFor="triviaAmount">
            Número de questões:
            <input
              data-testid="inputNumberQuest"
              type="number"
              name="triviaAmount"
              id="triviaAmount"
              className="form-control"
              min="1"
              max="20"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="trivia_category">
            Categoria:
            {' '}
            <select
              name="trivia_category"
              className="form-control"
              onChange={ this.handleChange }
              data-testid="inputCategoryQuest"
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>
          <label htmlFor="trivia_difficulty">
            Dificuldade:
            {' '}
            <select
              name="trivia_difficulty"
              className="form-control"
              onChange={ this.handleChange }
              data-testid="inputQuestion"
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="trivia_type">
            Estilo de perguntas:
            {' '}
            <select
              name="trivia_type"
              className="form-control"
              onChange={ this.handleChange }
              data-testid="inputType"
            >
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="button"
            onClick={ this.handleSubmit }
          >
            Salvar Configurações
          </button>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.objectOf(Object),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Settings);
