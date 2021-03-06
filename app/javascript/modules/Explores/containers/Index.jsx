import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { errCatcher } from 'utils/errors';
import ContentDimmer from 'components/ContentDimmer';
import Pagination from 'components/Pagination';
import { exploreOutfits, likeOutfit } from '../actions';
import Row from '../components/Row';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    const { fetchRecords } = this.props;
    fetchRecords({ page: 1 });
  }

  handlePageClick(page) {
    const { fetchRecords } = this.props;
    fetchRecords({ page });
  }

  handleLike(id) {
    const { like } = this.props;
    return like(id).then(({ value }) => {
      NotificationManager.success(value.data.message);
    }).catch(err => errCatcher(err));
  }

  renderEmpty = () => (
    <div className="text-center text-muted py-5">
      <div>There are no outfits in the system :(</div>
    </div>
  )

  render() {
    const {
      fetching, outfits, likingId, error, pagination,
    } = this.props;
    return (
      <Fragment>
        <div className="page-header">
          <h1 className="page-title">
            Explore Outfits
          </h1>
        </div>
        <ContentDimmer active={fetching} error={error}>
          {outfits.length === 0
            ? this.renderEmpty()
            : (
              <div>
                <div className="card-columns">
                  {outfits.map(i => (
                    <Row
                      key={i.id}
                      outfit={i}
                      handleLike={this.handleLike}
                      likingId={likingId}
                    />
                  ))}
                </div>
                <Pagination pagination={pagination} handlePageClick={this.handlePageClick} />
              </div>
            )}
        </ContentDimmer>
      </Fragment>
    );
  }
}

Index.propTypes = {
  fetchRecords: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  outfits: PropTypes.arrayOf(Object).isRequired,
  pagination: PropTypes.shape(Object).isRequired,
  likingId: PropTypes.number,
  error: PropTypes.string,
};

const mapStateToProps = store => store.explores;

const mapDispatchToProps = {
  fetchRecords: exploreOutfits,
  like: likeOutfit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
