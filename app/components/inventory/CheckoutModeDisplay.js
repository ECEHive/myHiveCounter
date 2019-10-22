import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InventoryActions from '../../actions/inventory';
import MyHiveAPI from '../../api/MyHiveAPI';

type Props = {
  value: number,
  checkoutModeEnum: Map | null,
  setInventoryCheckoutEnum: (any)=>void
};

class CheckoutModeDisplay extends React.PureComponent<Props> {
  render() {
    if (this.props.checkoutModeEnum) {
      if (Object.entries(this.props.checkoutModeEnum).length === 0) {
        this.props.setInventoryCheckoutEnum(null);
        (async () => {
          const modes = await MyHiveAPI.inventory.enumCheckoutModes();
          this.props.setInventoryCheckoutEnum(modes.data);
        })();
      } else {
        const value = this.props.checkoutModeEnum[this.props.value];
        if (value) {
          return <span>{value}</span>;
        }
        return <span>Undefined: {this.props.value}</span>;
      }
    }
    return <span>Loading...</span>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(InventoryActions, dispatch);
}

function mapStateToProps(state) {
  return {
    checkoutModeEnum: state.inventory.checkoutModeEnum
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModeDisplay);
