import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [], //admin list (all books)
  publicBooks: [], //catalog list (active books only)
  selectedBook: {}, //book shown on the details / edit page
  isLoading: false,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setPublicBooks: (state, action) => {
      state.publicBooks = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { reducer, actions } = bookSlice;
export const { setBooks, setPublicBooks, setSelectedBook, setIsLoading } =
  actions;

export default reducer;
