import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { sendLogin, quests } from '../redux/actions';
import { triviaFetch, triviaQuestions, triviaQuestionsSettings } from '../services';
import logo from '../trivia.png';
import '../App.css';
import '../styles/FormLogin.css';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disableButton: true,
      loading: false,
      // messageErrorEmail: false,
      // messageErrorPassword: false,
    };
  }

  validateForm = () => {
    const { name, email } = this.state;
    if (email === '' || name === '') {
      this.setState({
        disableButton: true,
        // messageErrorEmail: true,
        // messageErrorPassword: true,
      });
    } else {
      this.setState({
        disableButton: false,
        // messageErrorEmail: false,
        // messageErrorPassword: false,
      });
    }
  };

  handleBtn = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { history: { push }, dispatch, settingUser, dataSettings } = this.props;
    const { name, email } = this.state;
    const response = await triviaFetch();
    const { token } = response;
    const numberMagic = 5;
    const questions = await triviaQuestions(token, numberMagic);
    if (questions.response_code !== 0) {
      localStorage.setItem('token', '');
      return push('/');
    }
    if (settingUser) {
      const responseSettings = await triviaQuestionsSettings(dataSettings);
      if (responseSettings.response_code !== 0) {
        return push('/');
      }
      dispatch(quests(responseSettings));
    } else {
      dispatch(quests(questions));
      const responseHash = md5(email).toString();
      dispatch(sendLogin(responseHash, name));
      localStorage.setItem('token', token);
    }
    this.setState({ loading: false });
    push('/play');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateForm());
  };

  render() {
    const { disableButton, loading } = this.state;
    const { history } = this.props;
    return (
      <div className="">
        <div className="App-header">
          <Header history={ history } />
          <img src={ logo } className="App-logo" alt="logo" />
          {loading && <Loading />}
          <form action="">
            <label htmlFor="name">
              <input
                placeholder="Digite seu name..."
                data-testid="input-player-name"
                type="text"
                name="name"
                id="name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              <input
                placeholder="Digite seu email..."
                data-testid="input-gravatar-email"
                type="email"
                name="email"
                id="email"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disableButton }
              onClick={ this.handleBtn }
            >
              Play
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(Object),
  dispatch: PropTypes.func,
  settingUser: PropTypes.bool,
  dataSettings: PropTypes.objectOf(Object),
}.isRequired;

const mapStateToProps = ({ player: { settingUser, dataSettings } }) => ({
  settingUser,
  dataSettings,
});

export default connect(mapStateToProps)(Login);
