import { useEffect, useMemo, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import BookGrid from "@components/book/BookGrid";
import { fetchPublicBooksAction } from "@features/book/bookAction";

//Public catalog (container component): fetches books into Redux,
//filters them with a local search box and passes them to BookGrid
const HomePage = () => {
  const dispatch = useDispatch();
  const { publicBooks, isLoading } = useSelector((state) => state.bookInfo);

  //only this page needs the search text, so it stays in local state, not Redux
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPublicBooksAction());
  }, [dispatch]);

  //recomputed only when the books or the search text change
  const filteredBooks = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return publicBooks;
    return publicBooks.filter(
      ({ title = "", author = "" }) =>
        title.toLowerCase().includes(term) ||
        author.toLowerCase().includes(term),
    );
  }, [publicBooks, search]);

  return (
    <>
      <section className="hero">
        <Container>
          <h1 className="hero-title">Welcome to the Library</h1>
          <p className="hero-subtitle">
            Discover, explore and borrow books from our collection.
          </p>
          <InputGroup className="hero-search">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search by title or author"
              aria-label="Search books by title or author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Container>
      </section>

      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-baseline mb-3">
          <h2 className="section-title m-0">All Books</h2>
          {!isLoading && publicBooks.length > 0 && (
            <small className="text-muted">
              Showing {filteredBooks.length} of {publicBooks.length}
            </small>
          )}
        </div>
        <BookGrid
          books={filteredBooks}
          isLoading={isLoading}
          emptyMessage={
            search
              ? `No books match "${search}".`
              : "No books in the library yet."
          }
        />
      </Container>
    </>
  );
};

export default HomePage;
