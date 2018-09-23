import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContentDimmer from 'components/ContentDimmer';
import classNames from 'classnames';

const ShowItem = ({ item }) => (
  <div className="card">
    <div className="card-body">
      <div className="row">
        <div className="col-md-4 pb-2">Image</div>
        <div className="col-md-2 pb-2">
          <strong className="d-block">Brand:</strong>
          {item.brand.name}
        </div>
        <div className="col-md-2 pb-2">
          <strong className="d-block">Category:</strong>
          {item.category.name}
        </div>
        <div className="col-md-2 pb-2">
          <strong className="d-block">Color:</strong>
          {item.color.name}
        </div>
        <div className="col-md-2">
          <strong className="d-block">Price:</strong>
          {item.price}
          {' '}
          AED
        </div>
      </div>
    </div>
  </div>
);

const Items = ({
  items, error, fetching, selectedItem, handleSelect,
}) => {
  const itemRow = item => (
    <div key={`item-${item.id}`} className="col-md-3">
      <button
        onClick={() => handleSelect(item.id)}
        className={classNames('card m-0 h-100 pointer', {
          'bg-azure-lighter': selectedItem === item.id,
        })}
      >
        <div className="card-body">
          {item.name}
        </div>
      </button>
    </div>
  );

  return (
    <ContentDimmer active={fetching} error={error}>
      <span className="d-block mb-2">Select an Item to display suggestion</span>
      <div className="bg-blue-lightest p-4 border o-auto">
        <div className="flex-nowrap flex-row row">
          {items.map(i => itemRow(i))}
        </div>
      </div>

      {selectedItem && (
      <div className="mt-5">
        <ShowItem item={items.find(i => i.id === selectedItem)} />
      </div>
      )}
    </ContentDimmer>
  );
};

ShowItem.propTypes = {
  item: PropTypes.shape(Object).isRequired,
};

Items.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  selectedItem: PropTypes.number,
  handleSelect: PropTypes.func.isRequired,
};

const mapStateToProps = store => store.items;

export default connect(mapStateToProps)(Items);
