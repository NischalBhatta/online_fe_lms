import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <Stack gap={3}>
      <div className="p-2">
        <Link className="nav-link" to="/user">
          User
        </Link>
        <Link className="nav-link" to="/user/books">
          Books
        </Link>
        <Link className="nav-link" to="/user/review">
          Review
        </Link>
        <Link className="nav-link" to="/user/borrow-history">
          Borrow History
        </Link>
        <Link className="nav-link" to="/user/user-profile">
          User Profile
        </Link>
      </div>
    </Stack>
  );
};
