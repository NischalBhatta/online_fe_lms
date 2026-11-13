import React, { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";

const ForgetPassword = (e) => {
  const emailRef = useRef("");
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    console.log(email);
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
          <div className="text-end my-3">
            Ready to Login?
            <a href="/login">Login Now</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgetPassword;
