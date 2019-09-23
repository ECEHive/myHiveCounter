import React from 'react';
import { Descriptions, Card, Button, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { HiveUserEntity } from '../../api/user';

import routes from '../../constants/routes.json';
import styles from './UserInfoSummary.scss';
import ConditionalRender from '../common/ConditionalRender';

type Props = {
  user: HiveUserEntity,
  history: History
};

function formatUnixTimestamp(unix: number): string {
  return moment
    .unix(unix)
    .utc()
    .format('MMM DD, YYYY');
}

class UserInfoSummary extends React.Component<Props> {
  state = {
    showLoading: false
  };

  pushToEditPage = () => {
    this.props.history.push(routes.USER_CREATION);
  };

  onEditComplete = async () => {};

  render() {
    const { user } = this.props;

    return (
      <div className={styles.userInfoContainer}>
        <Card
          title="User information"
          extra={
            <Button
              type="primary"
              onClick={this.pushToEditPage}
              disabled={this.state.showLoading}
            >
              <i className="fas fa-user-edit" /> Edit
            </Button>
          }
        >
          <ConditionalRender render={this.state.showLoading}>
            <Spin />
          </ConditionalRender>
          <ConditionalRender render={!this.state.showLoading}>
            <Descriptions bordered>
              <Descriptions.Item label="First Name" span={2}>
                {user.FirstName}
              </Descriptions.Item>
              <Descriptions.Item label="Middle Name">
                {user.MiddleName}
              </Descriptions.Item>
              <Descriptions.Item label="Last Name" span={3}>
                {user.LastName}
              </Descriptions.Item>

              <Descriptions.Item label="GT Username">
                {user.GTUsername}
              </Descriptions.Item>
              <Descriptions.Item label="Joined At" span={2}>
                {formatUnixTimestamp(user.createdAt)}
              </Descriptions.Item>

              <Descriptions.Item label="GT Email" span={3}>
                {user.GTEmail}
              </Descriptions.Item>

              <Descriptions.Item label="User Type" span={3}>
                {user.HiveUserType}
              </Descriptions.Item>
            </Descriptions>
          </ConditionalRender>
        </Card>
      </div>
    );
  }
}

export default withRouter(UserInfoSummary);
