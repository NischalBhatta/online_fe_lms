import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleBookAction } from "@features/book/bookAction";
import { getBookImageSrc, showPlaceholder } from "@services/utils/imageUrl";

//one "label: value" row, skipped when the value is empty
const DetailRow = ({ label, value }) =>
  value ? (
    <tr>
      <th className="pe-4 py-1 text-muted fw-normal">{label}</th>
      <td className="py-1">{value}</td>
    </tr>
  ) : null;

//Public: full details of one book, chosen by the :_id in the URL (/book/:_id)
const BookDetailsPage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { selectedBook: book } = useSelector((state) => state.bookInfo);
  const { user } = useSelector((state) => state.userInfo);

  //which _id the last finished request was for; if it isn't the current URL's _id, we're still loading
  const [loadedId, setLoadedId] = useState(null);
  const isLoading = loadedId !== _id;

  useEffect(() => {
    let active = true; //ignore a slow response after the user has moved to another book
    dispatch(fetchSingleBookAction(_id)).then(
      () => active && setLoadedId(_id),
    );
    return () => {
      active = false;
    };
  }, [_id, dispatch]);

  //the backend returns inactive books too, so hide them from everyone but admins
  const isAdmin = user?.role === "admin";
  const isVisible =
    book?._id === _id && (book.status === "active" || isAdmin);

  const backLink = (
    <Link to="/" className="d-inline-block mb-3">
      &larr; Back to all books
    </Link>
  );

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!isVisible) {
    return (
      <Container className="py-4">
        {backLink}
        <Alert variant="warning">Sorry, we couldn&apos;t find that book.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {backLink}
      <Row className="g-4">
        <Col md={4} className="text-center">
          <img
            src={getBookImageSrc(book.imgUrl)}
            onError={showPlaceholder}
            alt={`Cover of ${book.title}`}
            className="book-cover-lg"
          />
        </Col>

        <Col md={8}>
          {book.status === "inactive" && (
            <Alert variant="secondary" className="py-2">
              This book is inactive: only admins can see it.
            </Alert>
          )}
          <h1 className="book-details-title">{book.title}</h1>
          <p className="lead text-muted">by {book.author}</p>

          <Badge
            bg={book.available ? "success" : "secondary"}
            className="mb-3"
          >
            {book.available ? "Available to borrow" : "Currently borrowed"}
          </Badge>

          <table className="mb-4">
            <tbody>
              <DetailRow label="ISBN" value={book.isbn} />
              <DetailRow label="Published" value={book.year} />
              <DetailRow label="Genre" value={book.genre} />
            </tbody>
          </table>

          {book.description && (
            <>
              <h5>About this book</h5>
              <p className="book-description">{book.description}</p>
            </>
          )}

          {/* borrowing is built in a later sprint */}
          {user?._id ? (
            <Button disabled title="Borrowing is coming soon">
              Borrow this book
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline-primary">Log in to borrow</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetailsPage;
