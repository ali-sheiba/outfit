import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const itemSource = {
  beginDrag(props) {
    return props.item;
  },
  endDrag({ handleDrop, item }, monitor) {
    if (!monitor.didDrop()) { return; }
    handleDrop(item.id);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

const Item = ({ item, connectDragSource, isDragging }) => {
  const opacity = isDragging ? 0 : 1;
  const cursor = isDragging ? '-webkit-grabbing' : '-webkit-grab';
  return connectDragSource(
    <div className="col-2" style={{ opacity, cursor }}>
      <img src={item.image_url} alt={item.name} />
    </div>,
  );
};

Item.propTypes = {
  item: PropTypes.shape(Object).isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

export default DragSource('item', itemSource, collect)(Item);
