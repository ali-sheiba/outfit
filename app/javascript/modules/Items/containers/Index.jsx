import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import ContentDimmer from 'components/ContentDimmer';
import { errCatcher } from 'utils/errors';
import { fetchItemsIfNeeded, deleteItem } from '../actions';
import Row from '../components/Row';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { fetchRecords } = this.props;
    fetchRecords();
  }

  handleDelete(id) {
    const { deleteRecord } = this.props;
    return deleteRecord(id).then(({ value }) => {
      NotificationManager.success(value.data.message);
    }).catch(err => errCatcher(err));
  }

  renderEmpty = () => (
    <div className="text-center text-muted py-5">
      <div>You dont habe any items</div>
    </div>
  )

  render() {
    const {
      fetching, count, items, deletingId, error,
    } = this.props;
    return (
      <Fragment>
        <div className="page-header">
          <h1 className="page-title">
            Items
          </h1>
        </div>
        <ContentDimmer active={fetching} error={error}>
          {count === 0
            ? this.renderEmpty()
            : (
              <div className="row justify-content-center">
                {items.map(i => (
                  <Row
                    key={i.id}
                    item={i}
                    handleDelete={this.handleDelete}
                    deletingId={deletingId}
                  />
                ))}
              </div>
            )}
        </ContentDimmer>
        <div className="text-center pt-5">
          <Link to="/items/new" className="btn btn-success btn-sm">Add Items</Link>
        </div>
      </Fragment>
    );
  }
}
Index.defaultProps = {
  deletingId: null,
};

Index.propTypes = {
  fetchRecords: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
  deletingId: PropTypes.number,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = store => store.items;

const mapDispatchToProps = {
  fetchRecords: fetchItemsIfNeeded,
  deleteRecord: deleteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
