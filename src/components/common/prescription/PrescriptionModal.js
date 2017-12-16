/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../../common/buttons/Button';
import FormLabel from '../../common/forms/FormLabel';

import Heading from '../typography/Heading';
import InlineItems from '../../common/forms/InlineItems';
import InputField from '../../common/forms/InputField';

import Select from '../../common/forms/Select';

// Translation data for this component
import intlData from './PrescriptionModal.intl';

/**
  * Component
  */
class PrescriptionModal extends React.Component {

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  };

  //*** Initial State ***//
  state = {
    prescription: {},
    fieldErrors: {}
  };

  //*** Component Lifecycle ***//

  componentDidMount() {
    // Component styles
    require('./PrescriptionModal.scss');
  }

  //*** View Controllers ***//

  handleChange = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;
    this.props.handleFieldChange(name, value);
    console.log(name+ ': ' + value)
  };

  render() {
    let intlStore = this.context.getStore(IntlStore);
    let submitLabel = "Save";
    return (<div>
      <div className="container">
        <div className="row name-input">
          <div className="col-sm-8">
            <input type="text" className="form-control input" placeholder={intlStore.getMessage(intlData, 'name')} name='name' value={this.props.prescription.prescriptionName} onChange={this.handleChange}/>
          </div>

        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="left-panel col-sm-10">
            <div className="row field-row">
              <div className="col-sm-2 label">
                <p><br/>OD-LEFT</p>
              </div>
              <div className="col-sm-4 field">
                <label>
                  Sphere(SPH)</label>
                <select className="custom-select selection" name='LSPH' value={this.props.prescription.LSPH} onChange={this.handleChange}>
                  <option selected="selected">0</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div className="col-sm-3 field">
                <label>
                  Cylinder(CYL)</label>
                  <select className="custom-select selection" name='LCYL' value={this.props.prescription.LCYL} onChange={this.handleChange}>
                  <option selected="selected">0</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div className="col-sm-3 field">
                <label>
                  Axis(Axis)</label>
                  <select className="custom-select selection" name='LAXIS' value={this.props.prescription.LAXIS} onChange={this.handleChange}>
                  <option selected="selected">0</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>

            <div className="row field-row">
              <div className="col-sm-2 label">
                <p><br/>OD-RIGHT</p>
              </div>
              <div className="col-sm-4 field">
                <label>
                  Sphere(SPH)</label>
                <select className="custom-select selection" name='RSPH' value={this.props.prescription.RSPH} onChange={this.handleChange}>
                  <option selected="selected">0</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div className="col-sm-3 field">
                <label>
                  Cylinder(CYL)</label>
                  <select className="custom-select selection" name='RCYL' value={this.props.prescription.RCYL} onChange={this.handleChange}>
                  <option selected="selected">0</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div className="col-sm-3 field">
                <label>
                  Axis(Axis)</label>
                  <select className="custom-select selection" name='RAXIS' value={this.props.prescription.RAXIS} onChange={this.handleChange}>
                  <option selected="selected">0</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>

          </div>

          <div className="right-panel col-sm-2">
            <div className="row">
              <div className="field nv-add col-sm-12">
                <label>NV-ADD</label>
                <select className="custom-select selection" name='NVADD' value={this.props.prescription.NVADD} onChange={this.handleChange}>
                  <option selected="selected">0</option>
                  <option value="100">1.00</option>
                  <option value="200">2.00</option>
                  <option value="300">3.00</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <div className="row single-row">
          <div className="col-sm-3">PRISM VALUES</div>
          <div className="col-sm-4">
            <div className="radio-input inline">
              <label>No
              </label>
              <input type="radio" name="optradio"></input>
            </div>

            <div className="radio-input inline">
              <label>Yes
              </label>
              <input type="radio" name="optradio"></input>
            </div>
          </div>
        </div>

        <div className="row single-row">
          <div className="col-sm-3">PD - PUPILLARY DISTANCE</div>
          <div className="col-sm-3">
            <label >Single PD
            </label>
            <input type="radio" name="optradio"></input>
            <div className="field col-sm-10">
              <select className="custom-select selection" name='PD' value={this.props.prescription.PD} onChange={this.handleChange}>
                <option selected="selected">0</option>
                <option value="100">65</option>
                <option value="200">66</option>
                <option value="300">67</option>
              </select>
            </div>
          </div>
          <div className="col-sm-3">
            <label >Double PD
            </label>
            <input type="radio" name="optradio"></input>
            <div className="field col-sm-10">
              <select className="custom-select selection">
                <option selected="selected">0</option>
                <option value="100">65</option>
                <option value="200">66</option>
                <option value="300">67</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>);
  }
}

/**
 * Exports
 */
export default PrescriptionModal;
