import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <div>Page not found</div>
      <Link to="/">Go back to home page</Link>
    </>
  );
};

export default Error404;
