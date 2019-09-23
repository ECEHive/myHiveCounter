import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Swal from 'sweetalert2';
import Shajs from 'sha.js';
import CardSwipeMonitor from '../components/common/CardSwipeMonitor';
import ConditionalRender from '../components/common/ConditionalRender';
import LoadingOverlay from '../components/common/LoadingOverlay';
import MyHiveAPI from '../api/MyHiveAPI';
import * as UserActions from '../actions/user';
import { HiveUserEntity } from '../api/user';

import routes from '../constants/routes.json';

type Props = {
  history: History,
  setCurrentUser: HiveUserEntity => void
};

type State = {};

const regexMatchPattern = /^[^=]+=(?<gtid>\d+)=.*$/;

class UserManagementPage extends React.Component<Props, State> {
  state = {
    fetchingUserData: false
  };

  swipeCallback = async result => {
    // SECTION: User Lookup
    const matchResult = regexMatchPattern.exec(result);
    if (matchResult && matchResult.groups && matchResult.groups.gtid) {
      const { gtid } = matchResult.groups;
      // Show Loading
      this.setState({
        fetchingUserData: true
      });
      // Compute SHA256
      const sha256HexDigest = new Shajs('sha256').update(gtid).digest('hex');
      console.log(`GTID (${gtid})Digest: ${sha256HexDigest}`);
      try {
        const userFetch = await MyHiveAPI.user.findUserByUniqueIdentifier(
          sha256HexDigest
        );
        if (userFetch.pagination.totalItems > 0) {
          console.log('User Found');
        } else {
          const confirm = await Swal.fire({
            title: `New user (GTID: ${gtid}) found`,
            text: 'Do you want to create a new user?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          });
          if (confirm.value) {
            // TODO Navitage to create account
            const user = new HiveUserEntity();
            user.UniqueIdentifier = sha256HexDigest;
            this.props.setCurrentUser(user);
            this.props.history.push(routes.USER_CREATION);
          }
        }
      } catch (e) {
        await Swal.fire({
          type: 'error',
          title: `Network error: ${e.response.status}`,
          text: `Server responded with a ${e.response.statusText}`
        });
      } finally {
        this.setState({
          fetchingUserData: false
        });
      }
    } else {
      await Swal.fire({
        type: 'error',
        title: 'Bad Swipe',
        text: 'Please double check the card and try again'
      });
    }
  };

  render() {
    return (
      <div>
        <div className="backButtonContainer">
          <Link to={routes.HOME}>
            <i className="fa fa-2x fa-arrow-left" />
          </Link>
        </div>
        <ConditionalRender render={!this.state.fetchingUserData}>
          <CardSwipeMonitor onSwipe={this.swipeCallback} />
        </ConditionalRender>
        <ConditionalRender render={this.state.fetchingUserData}>
          <LoadingOverlay />
        </ConditionalRender>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementPage);
