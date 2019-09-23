import React from 'react';
import { Form, Button, Input, Checkbox } from 'antd';
import Swal from 'sweetalert2';
import type { HiveUserEntity } from '../../api/user';
import ConditionalRender from '../common/ConditionalRender';
import LoadingOverlay from '../common/LoadingOverlay';
import MyHiveAPI from '../../api/MyHiveAPI';

class UserInfoForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.props.onSubmit(value);
      }
    });
  };

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
                message: 'Please enter your GT Usernmae'
              }
            ]
          })(<Input placeholder="burdell33" type="text" />)}
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
          {getFieldDecorator('MiddleName', {
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
  state = {
    submitting: false
  };

  onSubmitUserEdit = async value => {
    console.log(value);
    this.setState({ submitting: true });
    try {
      const result = await MyHiveAPI.user.upsertUserWithUniqueIdentifier(
        this.props.currentUser.UniqueIdentifier,
        value
      );
      await Swal.fire({
        type: 'success',
        title: 'User saved!'
      });
    } catch (e) {
      await Swal.fire({
        type: 'error',
        title: 'Whoops, Something went wrong'
      });
    } finally {
      this.setState({ submitting: false });
    }
  };

  render() {
    return (
      <div>
        <ConditionalRender render={this.state.submitting}>
          <LoadingOverlay />
        </ConditionalRender>
        <UserFormInstance
          user={this.props.currentUser}
          onSubmit={this.onSubmitUserEdit}
        />
      </div>
    );
  }
}
