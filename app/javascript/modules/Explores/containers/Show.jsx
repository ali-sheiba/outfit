import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentDimmer from 'components/ContentDimmer';
import Bill from 'modules/Outfits/components/Bill';
import ItemRow from 'modules/Items/components/Row';
import { exploreOutfit } from '../actions';

class Index extends Component {
  componentDidMount() {
    const { fetchRecord, match } = this.props;
    fetchRecord(match.params.id);
  }

  render() {
    const { fetching, outfit, error } = this.props;
    return (
      <ContentDimmer active={fetching} error={error}>
        <div className="page-header">
          <h1 className="page-title">
            {outfit.name}
          </h1>
        </div>

        { outfit && outfit.id && (
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              {outfit.items.map(i => <ItemRow key={`itemView-${i.id}`} item={i} />)}
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="media">
                  <div className="media-body">
                    <p className="text-muted mb-0">By:</p>
                    <h4 className="m-0">{outfit.user.name}</h4>
                  </div>
                </div>
              </div>
            </div>
            <Bill items={outfit.items} totalPrice={outfit.total_price} />
          </div>
        </div>
        )}
      </ContentDimmer>
    );
  }
}

Index.propTypes = {
  fetchRecord: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  outfit: PropTypes.shape(Object).isRequired,
  match: PropTypes.shape(Object).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = store => store.explores;

const mapDispatchToProps = {
  fetchRecord: exploreOutfit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
