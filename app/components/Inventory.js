import React from 'react';

import { Button, Col, Row, Input } from 'antd';
import { Link } from 'react-router-dom';
import styles from './inventory.scss';
import routes from '../constants/routes';

const { Search } = Input;

export default class Inventory extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Row type="flex" justify="center">
          <Col span={20} className={styles.inventoryTitle}>
            <h2>Hive Inventory Lookup</h2>
          </Col>
        </Row>
        <Row type="flex" justify="center" className={styles.inventorySearchBar}>
          <Col span={10}>
            <Search
              placeholder="Input name, type, id, or label to search"
              enterButton="Search"
              size="large"
              onSearch={value => console.log(value)}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" icon="plus" size="large">
              Add Item
            </Button>
          </Col>
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
