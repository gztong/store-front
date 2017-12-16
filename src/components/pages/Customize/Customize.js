/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';


// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import CartStore from '../../../stores/Cart/CartStore';
import CheckoutStore from '../../../stores/Checkout/CheckoutStore';
import DrawerStore from '../../../stores/Application/DrawerStore';
import IntlStore from '../../../stores/Application/IntlStore';
import OrderStore from '../../../stores/Orders/OrderStore';
import triggerDrawer from '../../../actions/Application/triggerDrawer';


import clearOrder from '../../../actions/Orders/clearOrder';
import createCart from '../../../actions/Cart/createCart';
import createCheckout from '../../../actions/Checkout/createCheckout';
import createOrder from '../../../actions/Orders/createOrder';
import updateCheckout from '../../../actions/Checkout/updateCheckout';

import updateAccountDetails from '../../../actions/Account/updateAccountDetails';

// Required components
import PrescriptionModal from '../../common/prescription/PrescriptionModal';


import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import InlineItems from '../../common/forms/InlineItems';
import Modal from '../../common/modals/Modal';
import Spinner from '../../common/indicators/Spinner';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './Customize.intl';

/**
 * Component
 */
class Customize extends React.Component {

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  };

  //*** Initial State ***//

  state = {
    user: Object.assign({}, this.context.getStore(AccountStore).getAccountDetails()),
    loading: undefined,
    error: undefined,
    prescription: {},
    lens:{},
    fieldErrors: {},
    cartLoading: this.context.getStore(CartStore).isLoading(),
    quantity: 1,
    addingToCart: false
  };


  //*** View Controllers ***//

  handlePrescriptionFieldChange = (name, value) => {
    let prescription = this.state.prescription;
    prescription[name] = value;
    this.setState({prescription: prescription});
  };

  handleSubmitClick = (details) => {

    let intlStore = this.context.getStore(IntlStore);
    if (details === 'prescription') {
      console.log(this.state.prescription);
      this.context.executeAction(updateAccountDetails, {prescription: this.state.prescription});
    }
  };


  handleAddToCartClick = () => {

    console.log(this.props.product);
      {/*let payload = Object.assign({details: this.props.params.product}, {
          id: this.state.product.id,
          quantity: this.getQuantityInCart() + this.state.quantity
      });
      this.setState({addingToCart: true});
      this.context.executeAction(addToCart, payload);*/}
  };


render(){
    let intlStore = this.context.getStore(IntlStore);
  return (
    <div className="container">

      <div className="row">
        <div className="title col-sm-4">
          <h3>1. PRESCRIPTION</h3>
        </div>
        <div className="col-sm-6"></div>
        <div className="col-sm-2 pull-right">
          <span>Clear All</span>
        </div>
      </div>

      <PrescriptionModal prescription = {this.state.prescription}
                         handleFieldChange = {this.handlePrescriptionFieldChange.bind(this)}>
      </PrescriptionModal>

        <div className="product-page__add-buttons">
                <Button type="primary"
                        onClick={this.handleAddToCartClick}
                        disabled={this.state.quantity <= 0 || this.state.cartLoading}>
                    <FormattedMessage
                        message={intlStore.getMessage(intlData, 'addToCart')}
                        locales={intlStore.getCurrentLocale()} />
                </Button>

            }
        </div>

     </div>
  )
  }

}


/**
 * Flux
 */
Customize = connectToStores(Customize, [AccountStore, CartStore, DrawerStore], (context) => {
    return {
        _cartTotalItems: context.getStore(CartStore).getTotalItems(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _openedDrawer: context.getStore(DrawerStore).getOpenedDrawer()
    };
});

/**
 * Exports
 */
export default Customize;
