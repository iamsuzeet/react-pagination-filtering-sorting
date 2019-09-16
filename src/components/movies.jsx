import React, { Component } from "react";
import _ from "lodash";

import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import Pagination from "./reusable/Pagination";
import ListGroup from "./reusable/ListGroup.jsx";

import { paginate } from "./utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  // componentDidMount() {
  //   this.setState({ movies: getMovies() });
  // }

  onDeleteHandler = id => {
    const selectedMovie = deleteMovie(id);
    const movies = this.state.movies.filter(
      movie => movie._id !== selectedMovie._id
    );
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,

      currentGenre
    } = this.state;

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter(m => m.genre._id === currentGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      currentGenre
    } = this.state;
    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col col-md-3 col-sm-3">
          <ListGroup
            items={genres}
            onGenreSelect={this.handleGenreChange}
            currentGenre={currentGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            handleLike={this.handleLike}
            onDeleteHandler={this.onDeleteHandler}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
