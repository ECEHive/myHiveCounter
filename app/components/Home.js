// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.scss';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.root_menu_container}>
          <Link to={routes.INVENTORY}>
            <div className={styles.root_menu_item}>
              <i className="fas fa-3x fa-warehouse"/>
              <br/>
              Inventory
            </div>
          </Link>
          <Link to={routes.WORKBENCH_RENTAL}>
            <div className={styles.root_menu_item}>
              <i className="fas fa-3x fa-key"/>
              <br/>
              <span>Bench Checkout</span>
            </div>
          </Link>
          <Link to={routes.USER_MANAGEMENT}>
            <div className={styles.root_menu_item}>
              <i className="fas fa-3x fa-user"/>
              <br/>
              User Info
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
