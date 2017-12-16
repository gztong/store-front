/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import triggerDrawer from '../../../actions/Application/triggerDrawer';
import updateAccountDetails from '../../../actions/Account/updateAccountDetails';

// Required components
import QuantitySelector from '../forms/QuantitySelector';
import Text from '../typography/Text';
import PrescriptionModal from '../../common/prescription/PrescriptionModal';
import Modal from '../../common/modals/Modal';
import Button from '../../common/buttons/Button';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class CartItem extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        placeholderImage: undefined,
        openModal: false,
        prescription:{},
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CartItem.scss');

        // Load static files
        this.setState({placeholderImage: require('../images/image_placeholder.png')});
    }

    //*** View Controllers ***//

    handleLinkClick = () => {
        this.context.executeAction(triggerDrawer, null);
    };

    handleOpenModalClick = (data) => {
      this.setState({
          openModal: true,
          prescription: Object.assign({}, data)
        });
    };

    handleModalCloseClick = () => {
        this.setState({
            openModal: null,
            fieldErrors: {}
        });
    };

    handlePrescriptionFieldChange = (field, value) => {
        let prescription = this.state.prescription;
        prescription[field] = value;
        this.setState({prescription: prescription});
        console.log("cartitem field changed to " + field + ": " + value);
    };

    handleModalSubmitClick = () => {
      console.log(this.state.prescription);
      this.context.executeAction(updateAccountDetails, {
        prescription: this.state.prescription
      });

    };
    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);
        let product = this.props.product.details;
        console.log(this.props);
        let prescription = this.props.product.prescription;

        let linkParams = {
            locale: intlStore.getCurrentLocale(),
            productId: product.id
        };


        let modal = () => {
          if(this.state.openModal)
          return (
            <Modal title="Update Prescription" onCloseClick={this.handleModalCloseClick}>

                <PrescriptionModal prescription = {this.state.prescription}
                                   handleFieldChange = {this.handlePrescriptionFieldChange.bind(this)}>
                </PrescriptionModal>

                 <div className="account__modal-form-actions">
                     <div className="account__modal-form-action-item">
                         <Button type="default"
                                 onClick={this.handleModalCloseClick}>
                                 Cancel
                         </Button>
                     </div>
                     <div className="account__modal-form-action-item">
                         <Button type="primary"
                                 onClick={this.handleModalSubmitClick.bind(null)}>
                             Update
                         </Button>
                     </div>
                 </div>
            </Modal>
          );
        }


        return (
            <div className="cart-item">
            {modal()}

                {/*<div className="account__address-edit" onClick={this.handleOpenModalClick.bind(null, prescription)}>
                    <Text weight="bold">
                      Prescription: {prescription.name}
                    </Text>
                </div>*/}

                <div className="cart-item__frame">
                    <Link className="cart-item__link"
                          to="product" params={linkParams}
                          onClick={this.handleLinkClick}>
                        <img className="cart-item__image" src={product.images && product.images.length > 0 ? `//${product.images[0].url}` : this.state.placeholderImage} />
                    </Link>
                </div>
                <div className="cart-item__details">
                    <div className="name">
                        <Text size="small">
                            <Link className="cart-item__link"
                                  to="product" params={linkParams}
                                  onClick={this.handleLinkClick}>
                                <FormattedMessage message={intlStore.getMessage(product.name)}
                                                  locales={intlStore.getCurrentLocale()} />
                            </Link>
                        </Text>
                    </div>
                    <div className="cart-item__price">
                        <Text size="small" weight="bold">
                            <FormattedNumber value={product.pricing.retail}
                                             style="currency"
                                             currency={product.pricing.currency} />
                        </Text>
                    </div>
                    <div className="cart-item__quantity">
                        <QuantitySelector value={this.props.product.quantity}
                                          onChange={this.props.onQuantityChange} />
                    </div>

                    <div>Prescription: {prescription}</div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
CartItem.defaultProps = {
    onQuantityChange: function (value) { debug(`onQuantityChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default CartItem;
