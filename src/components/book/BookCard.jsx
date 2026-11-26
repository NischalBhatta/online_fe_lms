import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBookImageSrc, showPlaceholder } from "@services/utils/imageUrl";

//One book in the catalog grid (presentational: data comes in as a prop).
//"stretched-link" makes the whole card clickable.
const BookCard = ({ book }) => {
  return (
    <Card className="book-card h-100">
      <Card.Img
        variant="top"
        src={getBookImageSrc(book.imageUrl)}
        onError={showPlaceholder}
        alt={`Cover of ${book.title}`}
        className="book-card-cover"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="book-card-title" title={book.title}>
          <Link to={`/book/${book._id}`} className="stretched-link">
            {book.title}
          </Link>
        </Card.Title>
        <Card.Subtitle className="text-muted mb-2">{book.author}</Card.Subtitle>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <small className="text-muted">{book.publishedYear || ""}</small>
          <Badge bg={book.isAvailable ? "success" : "secondary"}>
            {book.isAvailable ? "Available" : "Borrowed"}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
