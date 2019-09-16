import React from "react";

const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  onGenreSelect,
  currentGenre
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onGenreSelect(item)}
          key={item[valueProperty]}
          className={
            item === currentGenre ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
