import placeholder from "../../assets/book-placeholder.svg";

export const BOOK_PLACEHOLDER = placeholder;

//imageUrl is a backend-relative path such as /uploads/books/123-cover.jpg
export const getBookImageSrc = (imageUrl) =>
  imageUrl ? import.meta.env.VITE_ROOT_API + imageUrl : BOOK_PLACEHOLDER;

//use as <img onError={showPlaceholder}> for covers that no longer exist on the server
export const showPlaceholder = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = BOOK_PLACEHOLDER;
};
