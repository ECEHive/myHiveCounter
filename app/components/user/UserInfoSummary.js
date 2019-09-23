import React from 'react';
import { Descriptions, Card, Button} from 'antd';

import { HiveUserEntity } from '../../api/user';

import styles from './UserInfoSummary.scss';
import moment from 'moment';

type Props = {
  user: HiveUserEntity
};

export default class UserInfoSummary extends React.Component<Props> {

  static formatUnixTimestamp (unix: number): string {
    return moment.unix(unix).utc().format('MMM DD, YYYY')
  }

  render () {
    const { user } = this.props;

    return (
      <div className={styles.userInfoContainer}>
        <Card title="User information" extra={
          <Button type="primary"><i className="fas fa-user-edit"/> Edit</Button>
        }>
          <Descriptions bordered>
            <Descriptions.Item label="First Name" span={2}>{user.FirstName}</Descriptions.Item>
            <Descriptions.Item label="Middle Name">{user.MiddleName}</Descriptions.Item>
            <Descriptions.Item label="Last Name" span={3}>{user.LastName}</Descriptions.Item>

            <Descriptions.Item label="GT Username">{user.GTUsername}</Descriptions.Item>
            <Descriptions.Item label="Joined At" span={2}>{UserInfoSummary.formatUnixTimestamp(user.createdAt)}</Descriptions.Item>

            <Descriptions.Item label="GT Email" span={3}>{user.GTEmail}</Descriptions.Item>

            <Descriptions.Item label="User Type" span={3}>{user.HiveUserType}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    );
  }
}
