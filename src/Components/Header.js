import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import settingsButton from '../images/settingsButton.svg';
import '../styles/Header.css';

class Header extends Component {
  componentDidMount() {

  }

  handleButton = () => {
    const { history: { push } } = this.props;
    push('/settings');
  };

  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header data-testid="header">
        <div className="nameHash">
          <img
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            alt={ `perfil ${name}` }
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{name}</h2>
        </div>
        <div className="score">
          <strong>Score:</strong>
          <h3 data-testid="header-score">{score}</h3>
        </div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleButton }
        >
          <img src={ settingsButton } alt="settings" />
        </button>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.objectOf(Object),
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (
  { player: { score, name, gravatarEmail } },
) => ({
  gravatarEmail,
  name,
  score,
});

export default connect(mapStateToProps)(Header);
