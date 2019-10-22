import React from 'react';
import { Button, Descriptions, List, Modal } from 'antd';

type Props = {
  visible: boolean
};

export default class InventoryDetailModal extends React.Component<Props> {
  render () {
    return (
      <Modal visible={this.props.visible} footer={null} width="80%">
        <Descriptions title="Yeet" bordered>
          <Descriptions.Item label="Item Name" span={3}>Long Data</Descriptions.Item>
        </Descriptions>
        <h3 style={{ fontWeight: '600', fontSize: '22px', marginTop: '10px' }}>Item Instances</h3>
        <Button type="primary" style={{ margin: '10px' }}>Create new Instance</Button>
        <div
          style={{ height: '300px', overflowY: 'auto', border: '1px solid #eee', padding: '5px', borderRadius: '5px' }}>
          <List>
            <List.Item>YEet</List.Item>
            <List.Item>YEet</List.Item>
            <List.Item>YEet</List.Item>
            <List.Item>YEet</List.Item>
          </List>
        </div>
      </Modal>
    );
  }
}
