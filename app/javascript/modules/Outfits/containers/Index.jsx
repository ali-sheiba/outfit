import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import ContentDimmer from 'components/ContentDimmer';
import { errCatcher } from 'utils/errors';
import { fetchItemsIfNeeded } from 'modules/Items/actions';
import { fetchOutfitsIfNeeded, deleteOutfit } from '../actions';
import Row from '../components/Row';
import CheckItems from '../components/CheckItems';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { fetchRecords, getItems } = this.props;
    getItems();
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
      <div>You dont have any outfits</div>
    </div>
  )

  render() {
    const {
      outfits: {
        fetching, count, outfits, deletingId, error,
      },
      items: {
        count: itemsCount, fetching: iFetching, error: iError,
      },
    } = this.props;
    return (
      <Fragment>
        <div className="page-header">
          <h1 className="page-title">
            Outfits
          </h1>
        </div>
        <ContentDimmer active={fetching || iFetching} error={error || iError}>
          <CheckItems count={itemsCount}>
            {count === 0
              ? this.renderEmpty()
              : (
                <div className="card-columns">
                  {outfits.map(i => (
                    <Row
                      key={i.id}
                      outfit={i}
                      handleDelete={this.handleDelete}
                      deletingId={deletingId}
                    />
                  ))}
                </div>
              )}
          </CheckItems>
        </ContentDimmer>
        {itemsCount >= 3 && (
        <div className="text-center pt-5">
          <Link to="/outfits/new" className="btn btn-success btn-sm">Create Outfits</Link>
        </div>
        )}
      </Fragment>
    );
  }
}

Index.propTypes = {
  fetchRecords: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  outfits: PropTypes.shape(Object).isRequired,
  items: PropTypes.shape(Object).isRequired,
};

const mapStateToProps = store => ({
  outfits: store.outfits,
  items: store.items,
});

const mapDispatchToProps = {
  fetchRecords: fetchOutfitsIfNeeded,
  deleteRecord: deleteOutfit,
  getItems: fetchItemsIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
