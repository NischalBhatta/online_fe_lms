import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { SideBar } from "./SideBar";
import { AuthRoute } from "../auth/AuthRoute";

export const UserLayout = () => {
  return (
    <AuthRoute>
      {/* navbar */}
      <Header />
      {/* Body */}
      <Container fluid>
        <Row>
          <Col md={3} xl={2} className="bg-dark text-white">
            <div className="p-3">
              <div>Welcome Back</div>

              <h4>Nischal Bhatta</h4>
              <hr />
              <SideBar />
            </div>
          </Col>
          <Col md={9} xl={10}>
            {" "}
            <main className="main">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </AuthRoute>
  );
};
