import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import ContentDimmer from 'components/ContentDimmer';
import { errCatcher } from 'utils/errors';
import { fetchOptions, createItem } from '../actions';
import Form from '../components/Form';

class Index extends Component {
  componentDidMount() {
    const { getOptions } = this.props;
    getOptions();
  }

  handleSubmit = (values) => {
    const { submit, history } = this.props;
    return submit(values).then(({ value }) => {
      NotificationManager.success(value.data.message);
      history.push('/items');
    }).catch(err => errCatcher(err));
  };

  render() {
    const { fetching, options, error } = this.props;
    return (
      <ContentDimmer active={fetching} error={error}>
        <div className="page-header">
          <h1 className="page-title">
            New Item
          </h1>
        </div>
        <div className="row">
          { !fetching && <Form onSubmit={this.handleSubmit} options={options} />}
        </div>
      </ContentDimmer>
    );
  }
}

Index.propTypes = {
  getOptions: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  options: PropTypes.shape(Object).isRequired,
  history: PropTypes.shape(Object).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = store => store.items;

const mapDispatchToProps = {
  getOptions: fetchOptions,
  submit: createItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
