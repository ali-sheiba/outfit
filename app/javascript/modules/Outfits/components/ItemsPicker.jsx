/* eslint no-alert: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Item from './Item';
import Target from './Target';

class ItemsPicker extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleDrop(id) {
    const { input } = this.props;
    const values = Object.assign([], input.value);

    if (values.length >= 6) {
      return alert('Maximum 6 Items per outfit');
    }

    return input.onChange(values.concat(id));
  }

  handleRemove(id) {
    const { input } = this.props;
    const values = Object.assign([], input.value || []);
    const index = values.findIndex(item => item === id);
    values.splice(index, 1);
    return input.onChange(values);
  }

  render() {
    const { items, meta, input: { value } } = this.props;
    const availableItems = items.filter(i => !value.includes(i.id)) || [];
    const selectedItems = items.filter(i => value.includes(i.id)) || [];

    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">My Items</div>
            <div className="card-body">
              <div className="my-items-box">
                <div className="list-group">
                  {availableItems.map(i => (
                    <Item
                      key={i.id}
                      item={i}
                      handleDrop={this.handleDrop}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-header">Outfit Items</div>
            <Target
              items={selectedItems}
              handleRemove={this.handleRemove}
            />
          </div>

          {meta.error && (
            <div className="alert alert-danger">
              {meta.error}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ItemsPicker.propTypes = {
  input: PropTypes.shape(Object).isRequired,
  meta: PropTypes.shape(Object).isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
};

export default DragDropContext(HTML5Backend)(ItemsPicker);
