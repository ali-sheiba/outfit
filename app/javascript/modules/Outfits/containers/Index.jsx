import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import ContentDimmer from 'components/ContentDimmer';
import { errCatcher } from 'utils/errors';
import { fetchOutfitsIfNeeded, deleteOutfit } from '../actions';
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
      <div>You dont habe any outfits</div>
    </div>
  )

  render() {
    const {
      fetching, count, outfits, deletingId,
    } = this.props;
    return (
      <Fragment>
        <div className="page-header">
          <h1 className="page-title">
            Outfits
          </h1>
        </div>
        <ContentDimmer active={fetching}>
          {count === 0
            ? this.renderEmpty()
            : (
              <div className="row justify-content-center">
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
        </ContentDimmer>
        <div className="text-center pt-5">
          <Link to="/outfits/new" className="btn btn-success btn-sm">Create Outfits</Link>
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
  outfits: PropTypes.arrayOf(Object).isRequired,
  deletingId: PropTypes.number,
};

const mapStateToProps = store => store.outfits;

const mapDispatchToProps = {
  fetchRecords: fetchOutfitsIfNeeded,
  deleteRecord: deleteOutfit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
