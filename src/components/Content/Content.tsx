import React from 'react';
import styles from './Content.module.scss';

const Content: React.FC = ({ children }) => {
  return (
    <main className={styles.root}>
      {children}
    </main>
  )
}

export default Content;