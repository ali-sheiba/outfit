import React from 'react';
import PropTypes from 'prop-types';

const Bill = ({ items, totalPrice }) => (
  <div className="card">
    <div className="card-status bg-blue" />
    <div className="card-header">
      <h4 className="card-title">Outfit Cost</h4>
    </div>
    <table className="table m-0">
      <tbody>
        {items.map(i => (
          <tr key={`itemBill-${i.id}`}>
            <td>{i.name}</td>
            <td className="text-right">
              <strong>{i.price}</strong>
            </td>
          </tr>))}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td className="text-right">
            <strong>{totalPrice}</strong>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
);

Bill.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default Bill;
