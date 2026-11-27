import { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import CustomInput from "@components/customInput/CustomInput";
import useForm from "../../hooks/useForm";
import { bookInputs } from "../../assets/customInputs/bookInputs";
import { getBookImageSrc, showPlaceholder } from "@services/utils/imageUrl";

const TEXT_FIELDS = bookInputs.map(({ name }) => name);
const EDIT_ONLY_FIELDS = ["status", "available"];

const emptyBook = {
  title: "",
  author: "",
  isbn: "",
  year: "",
  genre: "",
  description: "",
  status: "active",
  available: true,
};

//Shared by NewBookPage and EditBookPage.
//onSubmit receives a FormData (fields + optional "image") and returns the API status.
const BookForm = ({ book = {}, isEdit = false, submitLabel, onSubmit }) => {
  const { form, handleOnChange } = useForm({
    ...emptyBook,
    ...book,
    year: book.year ?? "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isPending, setIsPending] = useState(false);

  //release the local preview URL when it changes or the form unmounts
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const handleOnImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file || null);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const fields = isEdit ? [...TEXT_FIELDS, ...EDIT_ONLY_FIELDS] : TEXT_FIELDS;
    const formData = new FormData();
    fields.forEach((name) => formData.append(name, form[name] ?? ""));
    imageFile && formData.append("image", imageFile);

    setIsPending(true);
    await onSubmit(formData);
    setIsPending(false);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Row>
        <Col md={8}>
          {bookInputs.map((input) => (
            <CustomInput
              key={input.name}
              {...input}
              value={form[input.name]}
              onChange={handleOnChange}
            />
          ))}

          {isEdit && (
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleOnChange}
                  >
                    <option value="active">Active (visible to users)</option>
                    <option value="inactive">Inactive (hidden)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Availability</Form.Label>
                  <Form.Select
                    name="available"
                    value={String(form.available)}
                    onChange={handleOnChange}
                  >
                    <option value="true">Available</option>
                    <option value="false">Not available</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Cover Image (JPG, PNG or WEBP, max 2MB)</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleOnImageChange}
            />
          </Form.Group>
          <Image
            src={preview || getBookImageSrc(book.imgUrl)}
            onError={showPlaceholder}
            alt="Book cover preview"
            thumbnail
            style={{ maxHeight: "260px" }}
          />
        </Col>
      </Row>

      <div className="d-grid mt-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </Form>
  );
};

export default BookForm;
