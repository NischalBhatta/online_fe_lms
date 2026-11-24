export const bookInputs = [
  {
    label: "Title*",
    name: "title",
    type: "text",
    required: true,
    placeholder: "Clean Code",
  },
  {
    label: "Author*",
    name: "author",
    type: "text",
    required: true,
    placeholder: "Robert C. Martin",
  },
  {
    label: "ISBN*",
    name: "isbn",
    type: "text",
    required: true,
    placeholder: "978-0132350884",
  },
  {
    label: "Published Year",
    name: "publishedYear",
    type: "number",
    min: 1000,
    max: new Date().getFullYear(),
    placeholder: "2008",
  },
  {
    label: "Genre",
    name: "genre",
    type: "text",
    placeholder: "Programming",
  },
  {
    label: "Description",
    name: "description",
    as: "textarea",
    rows: 4,
    placeholder: "A short summary of the book",
  },
];
