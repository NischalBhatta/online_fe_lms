import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const VerifyUser = () => {
  const [isPending, setIsPending] = useState(true);
  return (
    <div>
      {isPending && (
        <div className="mt-5 m-auto text-center" style={{ width: "450px" }}>
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>

          <div>Please do not go back or refresh the browser</div>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
