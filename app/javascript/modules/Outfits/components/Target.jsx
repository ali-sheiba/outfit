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
      <tr key={item.id}>
        <td className="w-45p">
          <img src={item.image_url} alt={item.name} className="h-8" />
        </td>
        <td>
          {item.name}
          <button
            className="btn btn-link p-0 btn-sm ml-2"
            onClick={(e) => {
              e.preventDefault();
              return handleRemove(item.id);
            }}
          >
            <i className="fas fa-times text-danger pointer" />
          </button>
        </td>
        <td className="d-none d-md-table-cell text-nowrap text-right">
          {'AED '}
          <strong>{item.price}</strong>
        </td>
      </tr>
    );
  }

  renderList() {
    const { items, isOver } = this.props;
    return (
      <table className={classNames('table card-table table-vcenter', { 'bg-azure-lightest': isOver })}>
        <tbody>
          {items.map(i => this.renderItem(i))}
          <tr>
            <td colSpan={2} className="text-center">
              {items.length}
              {' '}
              / 6 Items
            </td>
            <td className="text-right">
              Total Price: AED
              {' '}
              <strong>{this.grandTotal()}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderNone = () => {
    const { isOver } = this.props;
    return (
      <div className={classNames('card-body', { 'bg-azure-lightest': isOver })}>
        <div className="text-center p-5 text-muted">
          Drag items here
        </div>
      </div>
    );
  };

  render() {
    const { connectDropTarget, items } = this.props;
    return connectDropTarget(
      items.length > 0
        ? this.renderList()
        : this.renderNone(),
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
