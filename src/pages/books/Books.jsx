import { useEffect } from "react";
import { Badge, Button, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteBookAction,
  fetchAdminBooksAction,
} from "@features/book/bookAction";
import { getBookImageSrc, showPlaceholder } from "@services/utils/imageUrl";

//Admin: list of all books
const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.bookInfo);

  useEffect(() => {
    dispatch(fetchAdminBooksAction());
  }, [dispatch]);

  const handleOnDelete = (book) => {
    if (window.confirm(`Delete "${book.title}"? This cannot be undone.`)) {
      dispatch(deleteBookAction(book._id));
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Books</h3>
        <Link to="/user/new-book">
          <Button variant="primary">+ Add New Book</Button>
        </Link>
      </div>
      <hr />

      {books.length === 0 ? (
        <p className="text-muted">
          No books yet. Click "Add New Book" to add the first one.
        </p>
      ) : (
        <Table striped bordered hover responsive className="align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Status</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr key={book._id}>
                <td>{i + 1}</td>
                <td>
                  <Image
                    src={getBookImageSrc(book.imageUrl)}
                    onError={showPlaceholder}
                    alt={book.title}
                    width={50}
                    height={70}
                    style={{ objectFit: "cover" }}
                    rounded
                  />
                </td>
                <td>
                  {book.title}
                  {book.publishedYear && (
                    <div className="text-muted small">{book.publishedYear}</div>
                  )}
                </td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>
                  <Badge bg={book.status === "active" ? "success" : "secondary"}>
                    {book.status}
                  </Badge>
                </td>
                <td>
                  <Badge bg={book.isAvailable ? "info" : "warning"}>
                    {book.isAvailable ? "Available" : "Not available"}
                  </Badge>
                </td>
                <td className="text-nowrap">
                  <Link to={`/user/edit-book/${book._id}`}>
                    <Button size="sm" variant="warning" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleOnDelete(book)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Books;
