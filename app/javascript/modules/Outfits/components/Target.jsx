import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class Target extends Component {
  grandTotal() {
    const { items } = this.props;
    return items.map(i => parseFloat(i.price)).reduce((a, b) => a + b);
  }

  renderItem(item) {
    const { handleRemove } = this.props;
    return (
      <div key={item.id} className="list-group-item">
        <button
          className="float-right btn btn-link p-0 btn-sm"
          onClick={(e) => {
            e.preventDefault();
            return handleRemove(item.id);
          }}
        >
          <i className="fas fa-times text-danger pointer" />
        </button>
        {item.name}
        <span className="float-right text-muted mr-2">{item.price}</span>
      </div>
    );
  }

  renderList() {
    const { items } = this.props;
    return (
      <div>
        <div className="list-group">
          {items.map(i => this.renderItem(i))}
        </div>
        <div className="row text-center text-muted m-0 mt-4">
          <div className="col">
            {items.length}
            {' '}
            / 6 Items
          </div>
          <div className="col">
            Total Price:
            {' '}
            {this.grandTotal()}
          </div>
        </div>
      </div>
    );
  }

  renderNone = () => (
    <div className="text-center text-muted">
      No Selected Items
    </div>
  );

  render() {
    const { connectDropTarget, isOver, items } = this.props;
    return connectDropTarget(
      <div className={classNames('card-body', { 'bg-azure-lightest': isOver })}>
        {items.length > 0
          ? this.renderList()
          : this.renderNone()}
      </div>,
    );
  }
}

Target.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default DropTarget('item', {}, collect)(Target);
