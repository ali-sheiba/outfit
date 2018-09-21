import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { fetchOptions, createItem } from '../actions';
import ContentDimmer from '../../../components/ContentDimmer';
import Form from '../components/Form';
import { errCatcher } from '../../../utils/errors';

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
    const { fetching, options } = this.props;
    return (
      <ContentDimmer active={fetching}>
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
};

const mapStateToProps = store => store.items;

const mapDispatchToProps = {
  getOptions: fetchOptions,
  submit: createItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
