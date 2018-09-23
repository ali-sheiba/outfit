import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentDimmer from 'components/ContentDimmer';
import { fetchItemsIfNeeded } from '../../Items/actions';
import { fetchRecommendations, selectItem, unSelectItem } from '../actions';
import Items from '../components/Items';
import Row from '../components/Row';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { getItems } = this.props;
    getItems({ limit: -1 });
  }

  componentWillUnmount() {
    const { unSetItem } = this.props;
    unSetItem();
  }

  handleSelect(id) {
    const { setItem, fetchRecords } = this.props;
    setItem(id);
    fetchRecords({ item_id: id });
  }

  renderEmpty = () => (
    <div className="text-center text-muted py-5">
      <div>You dont have any recommendations</div>
    </div>
  )

  render() {
    const {
      fetching, recommendations, error, selectedItem,
    } = this.props;
    return (
      <Fragment>
        <div className="page-header">
          <h1 className="page-title">
            Recommendations
          </h1>
        </div>
        <Items selectedItem={selectedItem} handleSelect={this.handleSelect} />

        {selectedItem && (
        <ContentDimmer active={fetching} error={error}>
          <hr />
          <h2>Here are some outfits that might match your item:</h2>
          {recommendations.length === 0
            ? this.renderEmpty()
            : recommendations.map(o => <Row key={`outfit-${o.id}`} outfit={o} />)}
        </ContentDimmer>
        )}
      </Fragment>
    );
  }
}

Index.propTypes = {
  fetchRecords: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  unSetItem: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  recommendations: PropTypes.arrayOf(Object).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  selectedItem: PropTypes.number,
};

const mapStateToProps = store => store.recommendations;

const mapDispatchToProps = {
  fetchRecords: fetchRecommendations,
  getItems: fetchItemsIfNeeded,
  setItem: selectItem,
  unSetItem: unSelectItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
