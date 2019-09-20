import React from 'react';
import { Button } from 'antd';

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
    /* These are fake swipe buttons, the ```process.env.NODE_ENV``` controls it
       not display on production mode (including yarn start)
    */
    const fakeSwipe = process.env.NODE_ENV === 'production' ? null :
      (
        <div>
          <br/>
          <Button type="primary" onClick={() => {
            this.props.onSwipe(';1570=999999999=00=6017700006685730?')}}>
            Fake a Swipe
          </Button>
          <br /><br />
          <Button type="primary" onClick={() => {
            this.props.onSwipe(';1570=YY999999999=00=6017700006685730')}}>
            Bad Swipe
          </Button>
        </div>
      );

    return (
      <div className={styles.cardSwipeBackdrop}>
        <div className={styles.cardSwipeModal}>
          <h1>Swipe Buzzcard</h1>
          <span className={styles.spacer} />
          <div className={styles.rippleAnimation}>
            <div />
            <div />
          </div>
          {fakeSwipe}
        </div>
      </div>
    );
  }
}
