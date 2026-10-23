import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/customInput/customInput";
import { signupInputs } from "../../assets/customInputs/userSignupInputs";
import useForm from "../../hooks/useForm";

const initialState = {};

const SignUpPage = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <Form
          style={{ width: "450px" }}
          className="card p-5 mt-5 shadow-lg"
          onSubmit={handleOnSubmit}
        >
          <h3>Join Our Community!</h3>
          <hr />
          {signupInputs.map((input) => (
            <CustomInput
              key={input.name}
              {...input}
              onChange={handleOnChange}
            />
          ))}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUpPage;
