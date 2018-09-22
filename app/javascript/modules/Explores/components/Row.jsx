import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

const Row = ({ outfit, handleLike, likingId = null }) => (
  <div className="col-sm-6 col-xl-4">
    <div className="card">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{outfit.name}</h4>
        <p className="card-text">Yes</p>

        <div className="d-flex align-items-center pt-5 mt-auto">
          <div>
            <span className="text-default">{outfit.user.name}</span>
            <small className="d-block text-muted" title={outfit.created_at}>
              {moment(outfit.created_at).fromNow()}
            </small>
          </div>
          <div className="ml-auto text-muted">
            <small className="text-muted">{outfit.likes}</small>
            <button
              className="btn btn-link"
              onClick={() => handleLike(outfit.id)}
            >
              <i className={classNames({
                'fas fa-heart text-danger': outfit.liked,
                'far fa-heart': !outfit.liked,
                'fas fa-spin fa-spinner': likingId === outfit.id,
              })}
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
);

Row.propTypes = {
  outfit: PropTypes.shape(Object).isRequired,
  handleLike: PropTypes.func.isRequired,
  likingId: PropTypes.number,
};

export default Row;
