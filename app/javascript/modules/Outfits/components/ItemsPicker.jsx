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
    this.state = {
      picked: props.input.value || [],
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { picked } = this.state;
    const { input } = this.props;
    if (prevState.picked !== picked) {
      input.onChange(picked);
    }
  }

  handleDrop(id) {
    const { picked } = this.state;
    if (picked.length >= 6) {
      return alert('Maximum 6 Items per outfit');
    }

    return this.setState({ picked: picked.concat(id) });
  }

  handleRemove(id) {
    this.setState(({ picked }) => {
      const index = picked.findIndex(item => item === id);
      picked.splice(index, 1);
      return { picked };
    });
  }

  render() {
    const { items } = this.props;
    const { picked } = this.state;
    const availableItems = items.filter(i => !picked.includes(i.id)) || [];
    const selectedItems = items.filter(i => picked.includes(i.id)) || [];

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
            <div className="card-header">Target</div>
            <Target
              items={selectedItems}
              handleRemove={this.handleRemove}
            />
          </div>
        </div>
      </div>
    );
  }
}

ItemsPicker.propTypes = {
  input: PropTypes.shape(Object).isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
};

export default DragDropContext(HTML5Backend)(ItemsPicker);
