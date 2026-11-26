import { Col, Row, Spinner } from "react-bootstrap";
import BookCard from "./BookCard";

//Handles the 3 list states: loading, empty, data.
//Grid: 1 / 2 / 3 / 4 cards per row on phone / small / medium / large screens.
const BookGrid = ({ books = [], isLoading, emptyMessage = "No books found." }) => {
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!books.length) {
    return <p className="text-center text-muted py-5">{emptyMessage}</p>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {books.map((book) => (
        <Col key={book._id}>
          <BookCard book={book} />
        </Col>
      ))}
    </Row>
  );
};

export default BookGrid;
