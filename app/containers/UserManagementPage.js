import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes.json';
import CardSwipeMonitor from '../components/common/CardSwipeMonitor';

export default class UserManagementPage extends React.Component {
  render() {
    return (
      <div>
        <div className="backButtonContainer">
          <Link to={routes.HOME}>
            <i className="fa fa-2x fa-arrow-left" />
          </Link>
        </div>
        <CardSwipeMonitor
          onSwipe={result => {
            console.log(result);
          }}
        />
      </div>
    );
  }
}
