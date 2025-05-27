import React from "react";

const BookGrid = ({ books }) => {
  return (
    <ul>
      {books.map((post) => (
        <li key={post.book_id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default BookGrid;
