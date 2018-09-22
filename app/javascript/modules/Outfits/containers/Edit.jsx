import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import ContentDimmer from 'components/ContentDimmer';
import { errCatcher } from 'utils/errors';
import { fetchItemsIfNeeded } from 'modules/Items/actions';
import { fetchOutfit, updateOutfit } from '../actions';
import Form from '../components/Form';

class Edit extends Component {
  componentDidMount() {
    const { getItems, getOutfit, match } = this.props;
    getOutfit(match.params.id);
    getItems();
  }

  handleSubmit = (values) => {
    const { submit, history, match } = this.props;
    return submit(match.params.id, values).then(({ value }) => {
      NotificationManager.success(value.data.message);
      history.push(`/outfits/${match.params.id}`);
    }).catch(err => errCatcher(err));
  };

  initialValues() {
    const {
      outfits: { outfit },
    } = this.props;
    return {
      outfit: {
        name: outfit.name,
        item_ids: outfit.item_ids,
      },
    };
  }

  render() {
    const {
      outfits: { fetching, error },
      items: { items, fetching: fetchingItems, error: iError },
    } = this.props;

    return (
      <ContentDimmer active={fetching || fetchingItems} error={error || iError}>
        <div className="page-header">
          <h1 className="page-title">
            Update Outfits
          </h1>
        </div>
        { !fetching && !fetchingItems && (
        <Form
          onSubmit={this.handleSubmit}
          items={items}
          initialValues={this.initialValues()}
        />
        )}
      </ContentDimmer>
    );
  }
}

Edit.propTypes = {
  getItems: PropTypes.func.isRequired,
  getOutfit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  items: PropTypes.shape(Object).isRequired,
  outfits: PropTypes.shape(Object).isRequired,
  history: PropTypes.shape(Object).isRequired,
  match: PropTypes.shape(Object).isRequired,
};

const mapStateToProps = store => ({
  outfits: store.outfits,
  items: store.items,
});

const mapDispatchToProps = {
  getItems: fetchItemsIfNeeded,
  getOutfit: fetchOutfit,
  submit: updateOutfit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
