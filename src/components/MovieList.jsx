import React, { useEffect, useState } from "react";

// Data Movie
import { fetchMovies, searchMovies } from "../data/api";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Spinner,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const data = searchQuery
          ? await searchMovies(searchQuery, page)
          : await fetchMovies(page);
        if (data) {
          setMovies(data.results);
        } else {
          setError("⚠️ Failed to fetch movies. Please try again.");
        }
      } catch (err) {
        setError("⚠️ An error occurred while fetching movies.");
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [searchQuery, page]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (!loading) {
      setPage(newPage);
    }
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <h2 className="text-center mb-4">Popular Movies</h2>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <div className="alert alert-danger text-center">{error}</div>
          </Col>
        </Row>
      )}

      {loading ? (
        <Row className="mb-4">
          <Col className="text-center">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Col key={movie.id} md={4} lg={3}>
                <Card className="mb-4 shadow-sm">
                  {movie.poster_path ? (
                    <Card.Img
                      loading="lazy"
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="bg-light text-center py-5">
                      <span>No image available</span>
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="btn btn-primary w-100"
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="text-center py-5">
                <p className="fs-4">❌ No movies found!</p>
              </div>
            </Col>
          )}
        </Row>
      )}

      {movies.length > 0 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Pagination.Prev>
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(page + 1)}>
            Next
          </Pagination.Next>
        </Pagination>
      )}
    </Container>
  );
};

export default MovieList;
