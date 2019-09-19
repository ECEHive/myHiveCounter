import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes';

export default class WorkbenchRental extends React.Component {
  componentDidMount(): void {}

  render() {
    return (
      <div>
        <div className="backButtonContainer">
          <Link to={routes.HOME}>
            <i className="fas fa-2x fa-arrow-left" />
          </Link>
        </div>
      </div>
    );
  }
}
