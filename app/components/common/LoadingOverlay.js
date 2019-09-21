import React from 'react';

import styles from './LoadingOverlay.scss';

export default class LoadingOverlay extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Loading...</div>
      </div>
    );
  }
}
