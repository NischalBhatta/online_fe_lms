import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BookForm from "@components/book/BookForm";
import { postNewBookAction } from "@features/book/bookAction";

//Admin: add a new book
const NewBookPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = async (formData) => {
    const status = await dispatch(postNewBookAction(formData));
    status === "success" && navigate("/user/books");
  };

  return (
    <div className="p-3">
      <Link to="/user/books">
        <Button variant="link" className="px-0">
          &larr; Back to books
        </Button>
      </Link>
      <h3>Add New Book</h3>
      <hr />
      <BookForm submitLabel="Add Book" onSubmit={handleOnSubmit} />
    </div>
  );
};

export default NewBookPage;
