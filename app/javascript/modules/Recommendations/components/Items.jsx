import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContentDimmer from 'components/ContentDimmer';
import classNames from 'classnames';
import ItemDetails from './ItemDetails';

const Items = ({
  items, error, fetching, selectedItem, handleSelect,
}) => {
  const itemRow = item => (
    <div key={`item-${item.id}`} className="col-6 col-md-4">
      <div
        role="button"
        tabIndex="0"
        onClick={() => handleSelect(item.id)}
        onKeyPress={() => handleSelect(item.id)}
        className={classNames('card pointer p-0 bg-white', {
          'bg-azure-lighter': selectedItem === item.id,
        })}
      >
        <img src={item.image_url} alt={item.name} />
      </div>
    </div>
  );

  return (
    <ContentDimmer active={fetching} error={error}>
      <span className="d-block mb-2">Select an Item to display suggestion</span>
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-blue-lightest p-4 o-auto recommendations-h">
            {items.length > 0 ? (
              <div className="row">
                {items.map(i => itemRow(i))}
              </div>
            ) : (
              <div className="text-center text-muted">
              You dont have items, please add some.
              </div>
            ) }
          </div>
        </div>
        <div className="col-md-6">
          {selectedItem
            ? <ItemDetails item={items.find(i => i.id === selectedItem)} />
            : (
              <div className="card">
                <div className="card-body text-center recommendations-h">Select an item for details</div>
              </div>)}
        </div>
      </div>

    </ContentDimmer>
  );
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
