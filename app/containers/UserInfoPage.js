import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HiveUserEntity } from '../api/user';

import routes from '../constants/routes.json';
import PageContainer from '../components/common/PageContainer';
import UserInfoSummary from '../components/user/UserInfoSummary';

type Props = {
  currentUser: HiveUserEntity,
  history: History
};

class UserInfoPage extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.checkCurrentUserIsValid();
  }

  checkCurrentUserIsValid = () => {
    if (!this.props.currentUser) {
      this.props.history.replace(routes.HOME);
    }
  };

  render () {
    return (
      <div>
        <div className="backButtonContainer">
          <Link to={routes.HOME}>
            <i className="fa fa-2x fa-arrow-left" />
          </Link>
        </div>
        <PageContainer>
          <UserInfoSummary user={this.props.currentUser}/>
        </PageContainer>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.user.currentUser
  };
}

function mapActionToProps (dispatch) {
}

export default connect(
  mapStateToProps
)(UserInfoPage);
