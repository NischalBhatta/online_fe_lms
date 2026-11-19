import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/customInput/CustomInput";
import useForm from "../../hooks/useForm.js";
import {
  requestPassResetOTPAPI,
  resetPasswordAPI,
} from "../../services/authAPI";

const initialState = {
  otp: "",
  password: "",
  confirmPassword: "",
};

const ForgetPassword = () => {
  const emailRef = useRef("");
  const navigate = useNavigate();

  const [showPassResetForm, setShowPassResetForm] = useState(false);
  const [email, setEmail] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { form, passwordErrors, handleOnChange } = useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    setIsPending(true);
    const { status, message } = await requestPassResetOTPAPI({
      email: enteredEmail,
    });
    setIsPending(false);

    if (status === "success") {
      setEmail(enteredEmail);
      setOtpMessage(message);
      setShowPassResetForm(true);
    }
  };

  const handleOnPasswordReset = async (e) => {
    e.preventDefault();

    setIsPending(true);
    const { status } = await resetPasswordAPI({ email, ...form });
    setIsPending(false);

    status === "success" && navigate("/login");
  };

  return (
    <div className="signin-page d-flex justify-content-center align-items-center">
      <Card style={{ width: "18rem" }}>
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
              <Button type="submit" disabled={isPending}>
                {showPassResetForm ? "Resend OTP" : "Request OTP"}
              </Button>
            </div>
          </Form>

          {showPassResetForm && (
            <>
              <hr />

              {/* shown once the OTP has been requested */}
              <div>
                <Alert variant="success">{otpMessage}</Alert>

                <Form onSubmit={handleOnPasswordReset}>
                  <CustomInput
                    label="OTP"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    placeholder="123456"
                    value={form.otp}
                    onChange={handleOnChange}
                  />
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    required
                    placeholder="*********"
                    value={form.password}
                    onChange={handleOnChange}
                  />
                  <CustomInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="*********"
                    value={form.confirmPassword}
                    onChange={handleOnChange}
                  />
                  <div className="py-3">
                    <ul className="text-danger">
                      {passwordErrors.length > 0 &&
                        passwordErrors.map((msg) => <li key={msg}>{msg}</li>)}
                    </ul>
                  </div>
                  <div className="d-grid">
                    <Button
                      type="submit"
                      disabled={passwordErrors.length > 0 || isPending}
                    >
                      Reset Password
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
