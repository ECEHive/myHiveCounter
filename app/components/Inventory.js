import React from 'react';

import { Button, Col, Row, Input, Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import styles from './inventory.scss';
import routes from '../constants/routes';
import MyHiveAPI from '../api/MyHiveAPI';
import InventoryCreateItemModal from './inventory/InventoryCreateItemModal';

const { Search } = Input;

const InventoryColumns = [
  {
    title: 'ID',
    dataIndex: 'ItemLabelID'
  },
  {
    title: 'Name',
    dataIndex: 'ItemName'
  },
  {
    title: 'Total',
    dataIndex: 'ItemCount'
  },
  {
    title: 'In Stock',
    dataIndex: 'ItemCountInStock'
  },
  {
    title: 'Checkout Style',
    dataIndex: 'ItemCheckoutMode'
  },
  {
    title: 'Location',
    dataIndex: 'ItemLocation'
  }
];

export default class Inventory extends React.Component {
  constructor(params) {
    super(params);
    this.fetchInitialInventoryData();
  }

  state = {
    loading: true,
    inventoryQueryResult: [],
    inventoryQueryPagination: null
  };

  async fetchInitialInventoryData(page = 0) {
    this.setState({
      loading: true
    });
    const data = await MyHiveAPI.inventory.listInventoryItemClass(page);
    this.setState({
      inventoryQueryResult: data.data,
      inventoryQueryPagination: data.pagination,
      loading: false
    });
  }

  render() {
    const paginationConfig = {
      current: this.state.inventoryQueryPagination?.current,
      pageSize: this.state.inventoryQueryPagination?.pageSize,
      total: this.state.inventoryQueryPagination?.total
    };

    return (
      <div className={styles.container}>
        <div className={styles.backContainer}>
          <Link to={routes.HOME}>
            <i className="fas fa-arrow-left fa-2x" />
          </Link>
        </div>
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
        <Row type="flex" justify="center" className={styles.inventoryTable}>
          <Col
            span={22}
            style={{
              backgroundColor: 'white',
              borderRadius: '7px',
              padding: '10px 15px'
            }}
          >
            <Table
              columns={InventoryColumns}
              loading={this.state.loading}
              dataSource={this.state.inventoryQueryResult}
              rowKey="id"
              pagination={paginationConfig}
            />
          </Col>
        </Row>
        <InventoryCreateItemModal/>
      </div>
    );
  }
}
