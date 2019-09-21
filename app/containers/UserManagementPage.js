import React from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import routes from '../constants/routes.json';
import CardSwipeMonitor from '../components/common/CardSwipeMonitor';
import ConditionalRender from '../components/common/ConditionalRender';
import LoadingOverlay from '../components/common/LoadingOverlay';

type Props = {};

type State = {};

const regexMatchPattern = /^[^=]+=(?<gtid>\d+)=.*$/;

export default class UserManagementPage extends React.Component<Props, State> {
  state = {
    fetchingUserData: false
  };

  swipeCallback = result => {
    const matchResult = regexMatchPattern.exec(result);

    if (matchResult && matchResult.groups && matchResult.groups.gtid) {
      console.log(`Matched GTID: ${matchResult.groups.gtid}`);
    } else {
      Swal.fire({
        type: 'error',
        title: 'Bad Swipe'
      });
    }

    // this.setState({
    //   fetchingUserData: true
    // });
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
