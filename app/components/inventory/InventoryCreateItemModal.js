import React from 'react';
import { Modal, Form, Input, Radio, InputNumber } from 'antd';

/*
"id": 1,
"createdAt": 1569554195,
"updatedAt": 1569540297,
"ItemName": "DemoItem0",
"ItemLabel": "ItemLabel33333",
"ItemLabelID": "ICLS0001",
"ItemCountingType": 0,
"ItemCount": 0,
"ItemCountInStock": 0,
"ItemDescription": "",
"ItemDatasheet": "",
"ItemCheckoutMode": 0,
"ItemParameters": "",
"ItemLocation": ""
 */

class InventoryCreateItemModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal visible maskClosable={false} width="80%">
        <Form layout="vertical">
          <Form.Item label="Item Name">
            {getFieldDecorator('ItemName', {
              rules: [{ required: true, message: 'Name is required' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Name on Label">
            {getFieldDecorator('ItemLabel')(<Input />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('ItemDescription')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="Extra Parameters">
            {getFieldDecorator('ItemParameters')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="Item Total Stock">
            {getFieldDecorator('ItemCount')(<InputNumber min={0}/>)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(InventoryCreateItemModal);
