import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import CustomInput from "../../components/customInput/CustomInput";
import useForm from "../../hooks/useForm";
import { signinUserAPI } from "../../services/authAPI";
import { fetchUserAPI } from "../../features/user/userAPI";
const initialState = {};

const SignInPage = () => {
  const { form, handleOnChange } = useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (form.email && form.password) {
      const { payload } = await signinUserAPI(form);
      if (payload?.accessJWT) {
        sessionStorage.setItem("accessJWT", payload.accessJWT);
        localStorage.setItem("refreshJWT", payload.refreshJWT);

        //call api to get user
        const userInfo = await fetchUserAPI();
        console.log(userInfo);
      }

      //TODO: getting user and redirecting to dashboard
    } else {
      alert("Both input must be filled");
    }
  };

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
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              required
              placeholder="**** ****"
              onChange={handleOnChange}
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
