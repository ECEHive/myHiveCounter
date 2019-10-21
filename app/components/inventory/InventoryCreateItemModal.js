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

type Props = {
  visible: boolean,
  onCancel: () => void,
  onCreate: () => void,
  form: any
};

class InventoryCreateItemModal extends React.Component<Props> {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
        maskClosable={false}
        width="80%"
      >
        <Form layout="vertical">
          <Form.Item label="Item Name">
            {getFieldDecorator('ItemName', {
              rules: [{ required: true, message: 'Name is required' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Name on Label">
            {getFieldDecorator('ItemLabel', {
              rules: [
                {
                  max: 20,
                  message: 'Label must be shorter than 20 characters'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('ItemDescription')(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="Extra Parameters">
            {getFieldDecorator('ItemParameters')(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="Item Currently in Stock">
            {getFieldDecorator('ItemCountInStock')(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item label="Item Total Stock">
            {getFieldDecorator('ItemCount')(<InputNumber min={0} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(InventoryCreateItemModal);
