/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentDimmer from 'components/ContentDimmer';
import { fetchItemsIfNeeded } from '../../Items/actions';
import { fetchRecommendations, selectItem, unSelectItem } from '../actions';
import Items from '../components/Items';
import OutfitRow from '../components/OutfitRow';
import ItemRow from '../../Items/components/Row';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 1,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { getItems } = this.props;
    getItems({ limit: -1 });
  }

  componentWillUnmount() {
    const { unSetItem } = this.props;
    unSetItem();
  }

  handleChangeOptions(value) {
    this.setState({ checked: value });
  }

  handleSelect(id) {
    const { setItem, fetchRecords } = this.props;
    setItem(id);
    fetchRecords({ item_id: id });
  }

  renderEmpty = () => (
    <div className="text-center text-muted py-5">
      No recommendations for your item.
    </div>
  )

  renderOption = () => {
    const { checked } = this.state;
    return (
      <div className="text-center mb-5">
        <label className="form-label">Show Results As</label>
        <div className="selectgroup bg-white">
          <div className="selectgroup-item" role="button" onClick={() => this.handleChangeOptions(1)}>
            <input type="radio" name="viewOption" value={1} className="selectgroup-input" checked={checked === 1} />
            <span className="selectgroup-button">Outfits</span>
          </div>
          <div className="selectgroup-item" role="button" onClick={() => this.handleChangeOptions(2)}>
            <input type="radio" name="viewOption" value={2} className="selectgroup-input" checked={checked === 2} />
            <span className="selectgroup-button">Items</span>
          </div>
        </div>
      </div>
    );
  }

  renderOutfits() {
    const { outfits } = this.props;
    return outfits.length === 0
      ? this.renderEmpty()
      : outfits.map(o => <OutfitRow key={`outfit-${o.id}`} outfit={o} />);
  }

  renderItems() {
    const { items } = this.props;
    return items.length === 0
      ? this.renderEmpty()
      : (
        <div className="row">
          {items.map(i => <ItemRow key={`outfit-item-${i.id}`} item={i} colClass="col-md-3" />)}
        </div>
      );
  }

  render() {
    const {
      fetching, error, selectedItem,
    } = this.props;
    const { checked } = this.state;
    return (
      <Fragment>
        <div className="page-header">
          <h1 className="page-title">
            Recommendations
          </h1>
        </div>

        <Items selectedItem={selectedItem} handleSelect={this.handleSelect} />

        <hr />

        {this.renderOption()}

        {selectedItem && (
        <ContentDimmer active={fetching} error={error}>
          <h3>Here are some results that might match your item:</h3>
          { checked === 1 ? this.renderOutfits() : this.renderItems() }
        </ContentDimmer>
        )}
      </Fragment>
    );
  }
}

Index.propTypes = {
  fetchRecords: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  unSetItem: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  outfits: PropTypes.arrayOf(Object).isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  selectedItem: PropTypes.number,
};

const mapStateToProps = store => store.recommendations;

const mapDispatchToProps = {
  fetchRecords: fetchRecommendations,
  getItems: fetchItemsIfNeeded,
  setItem: selectItem,
  unSetItem: unSelectItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
