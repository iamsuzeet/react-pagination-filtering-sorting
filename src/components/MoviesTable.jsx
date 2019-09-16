import React, { Component } from "react";
import Like from "./reusable/Like";
import Table from "./reusable/Table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          onClick={() => this.props.handleLike(movie)}
          liked={movie.liked}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDeleteHandler(movie._id)}
          className="btn btn-danger"
        >
          {" "}
          Delete{" "}
        </button>
      )
    }
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
