import React from 'react';
import styles from '../styles/Loading.module.css';

function Loading() {
  return (
    <p data-testid="loading" className={ styles.loading }>Loading...</p>
  );
}

export default Loading;
