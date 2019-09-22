import React from 'react';

import styles from './PageContainer.scss';

type Props = {
  children: Node
};

export default class PageContainer extends React.PureComponent<Props> {
  render() {
    return <div className={styles.pageContainer}>{this.props.children}</div>;
  }
}
