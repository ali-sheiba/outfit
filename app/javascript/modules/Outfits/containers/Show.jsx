import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemRow from 'modules/Items/components/Row';
import { connect } from 'react-redux';
import ContentDimmer from 'components/ContentDimmer';
import { fetchOutfit } from '../actions';
import Bill from '../components/Bill';

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
          <div className="page-options">
            <Link
              to={`/outfits/${outfit.id}/edit`}
              className="btn btn-primary"
            >
            Edit
            </Link>
          </div>
        </div>

        { outfit && outfit.id && (
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              {outfit.items.map(i => <ItemRow key={`itemView-${i.id}`} item={i} />)}
            </div>
          </div>
          <div className="col">
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

const mapStateToProps = store => store.outfits;

const mapDispatchToProps = {
  fetchRecord: fetchOutfit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
