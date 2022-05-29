import React from 'react';
import styles from './Header.module.scss';

const today = new Date();

const Header = () => {
  return (
    <header className={styles.root}>
      <h1>Expense Tracker</h1>
      <div>
        <div>{today.toISOString().split('T')[0]}</div>
      </div>
    </header>
  )
}

export default Header;