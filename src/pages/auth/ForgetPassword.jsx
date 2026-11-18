import React, { useRef } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";
import useForm from "../../hooks/useForm.js";

const initialState = {};

const ForgetPassword = (e) => {
  const emailRef = useRef("");
  const { showPassResetForm, setShowPassResetForm } = useState(false);

  const { form, setForm, passwordErrors, handleOnChange } =
    useForm(initialState);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    console.log(email);
  };

  const handleOnPasswordReset = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="signin-page d-flex justify-content-center align-items-center">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Forgot Password? </Card.Title>
          <hr />
          <p>Don't Worry. Fill up the form below to request OTP</p>
          <Form onSubmit={handleOnSubmit}>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              required
              placeholder="name@email.com"
              passRef={emailRef}
            />
            <div className="d-grid">
              <Button type="submit">Request OTP</Button>
            </div>
          </Form>

          {showPassResetForm && (
            <>
              <hr />

              {/* show this form below once otp is sent */}
              <div>
                <Alert variant="success">Message</Alert>

                <Form onSubmit={handleOnPasswordReset}>
                  <CustomInput
                    label="OTP"
                    name="otp"
                    type="number"
                    required
                    placeholder="1234"
                    onChange={handleOnChange}
                  />
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    required
                    placeholder="*********"
                    onChange={handleOnChange}
                  />
                  <CustomInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="*********"
                    onChange={handleOnChange}
                  />
                  <div className="py-3">
                    <ul className="text-danger">
                      {passwordErrors.length > 0 &&
                        passwordErrors.map((msg) => <li key={msg}>{msg}</li>)}
                    </ul>
                  </div>
                  <div className="d-grid">
                    <Button type="submit" disabled={passwordErrors.length}>
                      Reset Password{" "}
                    </Button>
                  </div>
                </Form>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgetPassword;
