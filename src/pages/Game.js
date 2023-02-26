import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import '../styles/PageGame.css';
import Questions from '../Components/Questions';
import '../styles/Questions.css';

class PageGame extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="pageGameDiv">
        <Header history={ history } />
        <Questions history={ history } />
      </div>
    );
  }
}

PageGame.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default PageGame;
