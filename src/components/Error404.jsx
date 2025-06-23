/**
 * Error404 component displays a "Page not found" message and provides a link to navigate back to the home page.
 *
 * @component
 * @returns {JSX.Element} The rendered Error404 component.
 */
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
