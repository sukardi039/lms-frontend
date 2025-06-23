import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const { isAuthenticated, username, setThisBook } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Handles the click event on a book card.
   * If the user is authenticated, determines the current route context (borrow, return, or renew)
   * and navigates to the corresponding page for the selected book, setting the book in state.
   *
   * @function
   * @returns {void}
   */
  const cardClicked = () => {
    if (isAuthenticated) {
      let url = window.location.href;
      // console.log("url", url);
      let ura = url.split("/");
      // console.log("ura", ura);
      if (ura[3] == "borrow") {
        // console.log(book);
        setThisBook(book);
        navigate("/borrowthisbook?id=" + book.book_id);
      }
      if (ura[3] == "return") {
        // console.log(book);
        setThisBook(book);
        navigate("/returnthisbook?id=" + book.book_id);
      }
      if (ura[3] == "renew") {
        // console.log(book);
        setThisBook(book);
        navigate("/renewthisbook?id=" + book.book_id);
      }
    }
  };

  return (
    <Card
      margin={2}
      padding={2}
      sx={{ width: "100%", maxWidth: 270 }}
      onClick={cardClicked}
    >
      <Grid container spacing={2} bgcolor={`rgba(207, 185, 245, 0.4)`}>
        <Grid size={4} sx={{ justifyContent: "center" }}>
          <img
            // id={book.bookImage}
            // src={getBookImage(book.bookImage)}
            src={`${book.bookImage}`}
            alt={book.title}
            width="100%"
            margin={3}
          ></img>
        </Grid>
        <Grid size={8}>
          <Typography paddingLeft={1} paddingRight={1} variant="h6">
            {book.title}
          </Typography>
        </Grid>
      </Grid>
      {/* <CardMedia
        component="img"
        image={`/images/${book.bookImage}`}
        alt={book.title}
      /> */}
      <Divider></Divider>
      <Divider></Divider>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={5}>
            <Typography variant="body2">ISBN</Typography>
          </Grid>
          <Grid size={7}>
            <Typography variant="body">{book.isbn}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">Author</Typography>
          </Grid>
          <Grid size={7}>
            <Typography variant="body" overflow="ellipsis">
              {book.author}
            </Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">Year Published</Typography>
          </Grid>
          <Grid size={7}>
            <Typography variant="body">{book.publishedYear}</Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="body2">Category</Typography>
          </Grid>
          <Grid size={7}>
            <Typography variant="body">{book.category}</Typography>
          </Grid>
          {username.role == "admin" && (
            <Grid size={5}>
              <Typography variant="body2">Copies</Typography>
            </Grid>
          )}
          {username.role == "admin" && (
            <Grid size={7}>
              <Typography variant="body">{book.copyInStock}</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BookCard;
