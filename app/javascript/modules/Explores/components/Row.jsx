import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import OutfitItems from 'modules/Outfits/components/OutfitItems';

const Row = ({ outfit, handleLike, likingId = null }) => (
  <div className="card">
    <Link to={`explores/${outfit.id}`}>
      <OutfitItems items={outfit.items} />
    </Link>

    <div className="d-flex align-items-center p-3 mt-auto bg-white">
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
);

Row.propTypes = {
  outfit: PropTypes.shape(Object).isRequired,
  handleLike: PropTypes.func.isRequired,
  likingId: PropTypes.number,
};

export default Row;
