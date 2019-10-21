import React from 'react';

import { Button, Col, Row, Input, Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    inventoryQueryPagination: null,
    showCreateForm: false
  };
  formRef = null;

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  async fetchInitialInventoryData(page = 0) {
    this.setState({
      loading: true
    });
    console.log('fetching page ', page);
    const data = await MyHiveAPI.inventory.listInventoryItemClass(page);
    this.setState({
      inventoryQueryResult: data.data,
      inventoryQueryPagination: data.pagination,
      loading: false
    });
  }

  changePage = page => {
    this.fetchInitialInventoryData(page.current - 1);
  };

  onCreateFormSubmit = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return null;
      }
      console.log(values);
      try {
        const result = await MyHiveAPI.inventory.upsertInventoryClass(values);
        const swalResult = Swal.fire({
          type: 'success',
          timer: 3000,
          titleText: 'Added'
        });
        await this.fetchInitialInventoryData();
        form.resetFields();
        this.setState({
          showCreateForm: false
        });
        await swalResult;
      } catch (e) {
        Swal.fire({
          type: 'error',
          titleText: 'Something went wrong, check your input?',
          text: `Detail:\n${e}`
        });
      }
    });
  };

  onCreateFormCancel = () => {
    this.setState({
      showCreateForm: false
    });
    this.formRef.props.form.resetFields();
  };

  render() {
    const paginationConfig = {
      current: this.state.inventoryQueryPagination?.currentPage + 1,
      pageSize: this.state.inventoryQueryPagination?.pageSize,
      total: this.state.inventoryQueryPagination?.totalItems
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
            <Button
              type="primary"
              icon="plus"
              size="large"
              onClick={() => {
                this.setState({ showCreateForm: true });
              }}
            >
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
              onChange={this.changePage}
            />
          </Col>
        </Row>
        <InventoryCreateItemModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.showCreateForm}
          onCancel={this.onCreateFormCancel}
          onCreate={this.onCreateFormSubmit}
        />
      </div>
    );
  }
}
