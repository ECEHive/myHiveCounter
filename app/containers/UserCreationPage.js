import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import routes from '../constants/routes';
import { HiveUserEntity } from '../api/user';
import * as UserActions from '../actions/user';
import PageContainer from '../components/common/PageContainer';
import UserinfoEdit from '../components/user/UserinfoEdit';

type Props = {
  currentUser: HiveUserEntity,
  history: History,
  setCurrentUser: HiveUserEntity => void
};

class UserCreationPage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.checkValidCurrentUser();
  }

  componentDidMount(): void {
    this.checkValidCurrentUser();
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    this.checkValidCurrentUser();
  }

  checkValidCurrentUser() {
    if (this.props.currentUser === null) {
      this.props.setCurrentUser(null);
      this.props.history.replace(routes.USER_MANAGEMENT);
    }
  }

  userCreationComplete = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <div className="backButtonContainer">
          <Link to={routes.HOME}>
            <i className="fa fa-2x fa-arrow-left" />
          </Link>
        </div>
        <PageContainer>
          <UserinfoEdit
            currentUser={this.props.currentUser}
            setCurrentUser={this.props.setCurrentUser}
            onComplete={this.userCreationComplete}
          />
        </PageContainer>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCreationPage);
