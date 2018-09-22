import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { errCatcher } from 'utils/errors';
import ContentDimmer from 'components/ContentDimmer';
import { exploreOutfits, likeOutfit } from '../actions';
import Row from '../components/Row';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    const { fetchRecords } = this.props;
    fetchRecords();
  }

  handleLike(id) {
    const { like } = this.props;
    return like(id).then(({ value }) => {
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
      fetching, outfits, likingId,
    } = this.props;
    return (
      <Fragment>
        <div className="page-header">
          <h1 className="page-title">
            Explore Other Outfits
          </h1>
        </div>
        <ContentDimmer active={fetching}>
          {outfits.length === 0
            ? this.renderEmpty()
            : (
              <div className="row justify-content-center">
                {outfits.map(i => (
                  <Row
                    key={i.id}
                    outfit={i}
                    handleLike={this.handleLike}
                    likingId={likingId}
                  />
                ))}
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
  likingId: PropTypes.number,
};

const mapStateToProps = store => store.explores;

const mapDispatchToProps = {
  fetchRecords: exploreOutfits,
  like: likeOutfit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
