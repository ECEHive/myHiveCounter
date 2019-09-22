import React from 'react';
import { Form, Button, Input, Checkbox } from 'antd';
import type { HiveUserEntity } from '../../api/user';

class UserInfoForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.user);
    const {
      GTEmail,
      FirstName,
      MiddleName,
      LastName,
      GTUsername,
      PersonalEmail
    } = this.props.user;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Unique ID">
          <Input disabled value={this.props.user.UniqueIdentifier} />
        </Form.Item>
        <Form.Item label="GT Email">
          {getFieldDecorator('GTEmail', {
            initialValue: GTEmail,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input placeholder="burdell33@gatech.edu" />)}
        </Form.Item>
        <Form.Item label="Preferred Email">
          {getFieldDecorator('PersonalEmail', {
            initialValue: PersonalEmail,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]
          })(<Input placeholder="burdell33@gatech.edu" />)}
        </Form.Item>
        <Form.Item label="GT Username">
          {getFieldDecorator('GTUsername', {
            initialValue: GTUsername,
            rules: [
              {
                required: true,
                message: 'Please enter your GTUsernmae'
              }
            ]
          })(<Input placeholder="burdell33" />)}
        </Form.Item>
        <Form.Item label="First Name">
          {getFieldDecorator('FirstName', {
            initialValue: FirstName,
            rules: [
              {
                required: true,
                message: 'Please enter your First Name'
              }
            ]
          })(<Input placeholder="George" />)}
        </Form.Item>
        <Form.Item label="Middle Name">
          {getFieldDecorator('GTUsername', {
            initialValue: MiddleName
          })(<Input placeholder="P." />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('LastName', {
            initialValue: LastName,
            rules: [
              {
                required: true,
                message: 'Please enter your Last Name'
              }
            ]
          })(<Input placeholder="Burdell" />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const UserFormInstance = Form.create({})(UserInfoForm);

type Props = {
  currentUser: HiveUserEntity,
  setCurrentUser: HiveUserEntity => void
};

export default class UserinfoEdit extends React.Component<Props> {
  render() {
    return (
      <div>
        <UserFormInstance user={this.props.currentUser} />
      </div>
    );
  }
}
