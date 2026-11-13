import React, { useRef } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";
import useForm from "../../hooks/useForm";
import { signinUserAPI } from "../../services/authAPI";
import { fetchUserAPI } from "../../features/user/userAPI";
import { autoLogin, fetchUserAction } from "../../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const initialState = {
  email: "1@7.com",
  password: "Asdf1@",
};

const SignInPage = () => {
  const { form, handleOnChange } = useForm(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userInfo);

  const showLoaderRef = useRef(true);

  useEffect(() => {
    user?._id ? navigate("/user") : dispatch(autoLogin());

    if (
      sessionStorage.getItem("accessJWT") ||
      localStorage.getItem("refreshJWT")
    ) {
      setTimeout(() => {
        showLoaderRef.current = false;
      }, 2000);
    } else {
      showLoaderRef.current = false;
    }

    showLoaderRef.current = false;
  }, [user?._id, navigate, dispatch]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (form.email && form.password) {
      const { payload } = await signinUserAPI(form);
      if (payload?.accessJWT) {
        sessionStorage.setItem("accessJWT", payload.accessJWT);
        localStorage.setItem("refreshJWT", payload.refreshJWT);

        //call api to get user profile
        dispatch(fetchUserAction());
      }

      //TODO: getting user and redirecting to dashboard
    } else {
      alert("Both input must be filled");
    }
  };

  if (showLoaderRef.current) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="signin-page d-flex justify-content-center align-items-center">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Welcome Back to the Library</Card.Title>
          <hr />
          <Form onSubmit={handleOnSubmit}>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              required
              placeholder="name@email.com"
              onChange={handleOnChange}
              value={form.email}
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              required
              placeholder="**** ****"
              onChange={handleOnChange}
              value={form.password}
            />
            <div className="d-grid">
              <Button type="submit">Sign In</Button>
            </div>
          </Form>
          <div className="text-end my-3">
            Forgot Password?
            <a href="/forget-password">Reset Now</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignInPage;
