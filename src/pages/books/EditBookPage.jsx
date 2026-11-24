import { useEffect, useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookForm from "@components/book/BookForm";
import {
  deleteBookAction,
  fetchSingleBookAction,
  updateBookAction,
} from "@features/book/bookAction";

//Admin: edit or delete a book
const EditBookPage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedBook } = useSelector((state) => state.bookInfo);
  const [loadStatus, setLoadStatus] = useState("loading");

  useEffect(() => {
    dispatch(fetchSingleBookAction(_id)).then(setLoadStatus);
  }, [_id, dispatch]);

  const handleOnSubmit = async (formData) => {
    const status = await dispatch(updateBookAction(_id, formData));
    status === "success" && navigate("/user/books");
  };

  const handleOnDelete = async () => {
    if (
      !window.confirm(`Delete "${selectedBook.title}"? This cannot be undone.`)
    )
      return;

    const status = await dispatch(deleteBookAction(_id));
    status === "success" && navigate("/user/books");
  };

  const isLoaded = selectedBook?._id === _id;

  return (
    <div className="p-3">
      <Link to="/user/books">
        <Button variant="link" className="px-0">
          &larr; Back to books
        </Button>
      </Link>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="m-0">Edit Book</h3>
        {isLoaded && (
          <Button variant="outline-danger" onClick={handleOnDelete}>
            Delete Book
          </Button>
        )}
      </div>
      <hr />

      {isLoaded ? (
        //key resets the form if the admin navigates to another book
        <BookForm
          key={selectedBook._id}
          book={selectedBook}
          isEdit
          submitLabel="Update Book"
          onSubmit={handleOnSubmit}
        />
      ) : loadStatus === "loading" ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Alert variant="danger">Book not found.</Alert>
      )}
    </div>
  );
};

export default EditBookPage;
