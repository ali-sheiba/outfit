import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContentDimmer from 'components/ContentDimmer';
import classNames from 'classnames';

const ShowItem = ({ item }) => (
  <div className="card card-aside">
    <img src={item.image_url} alt={item.name} className="card-aside-column h-100" />
    <div className="card-body">
      <div className="pb-2">
        <strong className="d-block">Brand:</strong>
        {item.brand.name}
      </div>
      <div className="pb-2">
        <strong className="d-block">Category:</strong>
        {item.category.name}
      </div>
      <div className="pb-2">
        <strong className="d-block">Color:</strong>
        {item.color.name}
      </div>
      <div>
        <strong className="d-block">Price:</strong>
        {item.price}
        {' '}
        AED
      </div>
    </div>
  </div>
);

const Items = ({
  items, error, fetching, selectedItem, handleSelect,
}) => {
  const itemRow = item => (
    <div key={`item-${item.id}`} className="col-md-2">
      <button
        onClick={() => handleSelect(item.id)}
        className={classNames('border h-100 pointer p-0', {
          'bg-azure-lighter': selectedItem === item.id,
        })}
      >
        <img src={item.image_url} alt={item.name} />
      </button>
    </div>
  );

  return (
    <ContentDimmer active={fetching} error={error}>
      <span className="d-block mb-2">Select an Item to display suggestion</span>
      <div className="bg-blue-lightest p-4 border o-auto">
        {items.length > 0 ? (
          <div className="flex-nowrap flex-row row">
            {items.map(i => itemRow(i))}
          </div>
        ) : (
          <div className="text-center text-muted">
          You dont have items, please add some.
          </div>
        ) }
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
