import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import ContentDimmer from 'components/ContentDimmer';
import { errCatcher } from 'utils/errors';
import { fetchItemsIfNeeded } from 'modules/Items/actions';
import { createOutfit } from '../actions';
import Form from '../components/Form';
import CheckItems from '../components/CheckItems';

class New extends Component {
  componentDidMount() {
    const { getItems } = this.props;
    getItems({ limit: -1 });
  }

  handleSubmit = (values) => {
    const { submit, history } = this.props;
    return submit(values).then(({ value }) => {
      NotificationManager.success(value.data.message);
      history.push('/outfits');
    }).catch(err => errCatcher(err));
  };

  render() {
    const {
      items: {
        items, fetching, error, count,
      },
    } = this.props;

    return (
      <ContentDimmer active={fetching} error={error}>
        <CheckItems count={count}>
          <div className="page-header">
            <h1 className="page-title">
              Create Outfits
            </h1>
          </div>
          { !fetching && <Form onSubmit={this.handleSubmit} items={items} />}
        </CheckItems>
      </ContentDimmer>
    );
  }
}

New.propTypes = {
  getItems: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  items: PropTypes.shape(Object).isRequired,
  history: PropTypes.shape(Object).isRequired,
};

const mapStateToProps = store => ({
  outfits: store.outfits,
  items: store.items,
});

const mapDispatchToProps = {
  getItems: fetchItemsIfNeeded,
  submit: createOutfit,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
