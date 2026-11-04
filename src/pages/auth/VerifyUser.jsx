import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { activateNewUserAPI } from "../../services/authAPI";

const VerifyUser = () => {
  const [isPending, setIsPending] = useState(true);
  const [searchhParams] = useSearchParams();
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  const shouldFetchRef = useRef(true);

  const sessionId = searchhParams.get("sessionId");
  const t = searchhParams.get("t");

  useEffect(() => {
    //cal API

    if (sessionId && t && shouldFetchRef.current) {
      (async () => {
        const result = await activateNewUserAPI({ sessionId, t });
        setResponse(result);
        setIsPending(false);
      })();
      shouldFetchRef.current = false;
    }
    if (response.status === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [sessionId, t, response.status, navigate]);

  console.log(response);

  return (
    <div className="py-5 p-5">
      {isPending && (
        <div className="mt-5 m-auto text-center" style={{ width: "450px" }}>
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>

          <div>Please do not go back or refresh the browser</div>
        </div>
      )}
      {response?.message && (
        <Alert variant={response.status === "success" ? "success" : "danger"}>
          {response.message}
        </Alert>
      )}
    </div>
  );
};

export default VerifyUser;
