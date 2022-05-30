import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li className={styles.listItem}>
          <Link to='/bills'>Bills</Link>
        </li>
        <li className={styles.listItem}>Settings</li>
      </ul>
    </nav>
  )
}

export default Menu;