import React from 'react';

import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import styles from './inventory.scss';
import routes from '../constants/routes';

export default class Inventory extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Row type="flex" justify="center">
          <Col span={20} className={styles.inventoryTitle}>
            <h2>Hive Inventory Lookup</h2>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          Filler
        </Row>
        <div className={styles.backContainer}>
          <Link to={routes.HOME}>
            <i className="fas fa-arrow-left fa-2x" />
          </Link>
        </div>
      </div>
    );
  }
}
