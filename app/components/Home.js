// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.scss';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.root_menu_container}>
          <div className={styles.root_menu_item}>
            <i className="fas fa-3x fa-clipboard-check" />
            <br />
            Checkout
          </div>
          <Link to={routes.INVENTORY}>
            <div className={styles.root_menu_item}>
              <i className="fas fa-3x fa-warehouse" />
              <br />
              Inventory
            </div>
          </Link>
          <div className={styles.root_menu_item}>
            <i className="fas fa-3x fa-flask" />
            <br />
            Hive Lab
          </div>
        </div>
      </div>
    );
  }
}
