import React from 'react';

import styles from './CardSwipeMonitor.scss';

type Props = {
  onSwipe: string => void
};

type States = {
  charSequence: string
};

export default class CardSwipeMonitor extends React.PureComponent<
  Props,
  States
> {
  state = {
    charSequence: ''
  };

  componentDidMount(): void {
    document.addEventListener('keypress', this.keyListener);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keypress', this.keyListener);
  }

  keyListener = e => {
    if (e.key === 'Enter') {
      if (this.props.onSwipe) {
        this.props.onSwipe(this.state.charSequence);
      }
      this.setState({
        charSequence: ''
      });
    } else {
      this.setState({
        charSequence: this.state.charSequence + e.key
      });
    }
  };

  render() {
    return (
      <div className={styles.cardSwipeBackdrop}>
        <div className={styles.cardSwipeModal}>
          <h1>Swipe Buzzcard</h1>
          <span className={styles.spacer} />
          <div className={styles.rippleAnimation}>
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }
}
