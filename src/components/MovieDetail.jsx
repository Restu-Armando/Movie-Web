import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailMovies } from "../data/api";
import { Container, Card, Spinner, Row, Col } from "react-bootstrap";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDetailMovies(id)
      .then((data) => {
        if (data) {
          setMovie(data);
        } else {
          setError("⚠️ Failed to load movie details.");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);
  if (error) return <p className="text-center text-danger">{error}</p>;

  if (loading) return <Spinner animation="border" className="text-center" />;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6} lg={4} className="mx-auto">
          <Card>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              loading="lazy"
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
              <Card.Text>
                <strong>Rating:</strong> {movie.vote_average}
              </Card.Text>
              <Card.Text>
                <strong>Release Date:</strong> {movie.release_date}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
