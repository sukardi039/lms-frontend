import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const BookCard = ({ book }) => {
  return (
    <Card margin={5} padding={3} sx={{ maxWidth: 300 }}>
      <Grid container spacing={2}>
        <Grid size={4} sx={{ justifyContent: "center" }}>
          <img
            src={`/images/${book.bookImage}`}
            alt={book.title}
            width="100%"
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
            <Typography variant="body">{book.author}</Typography>
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
          <Grid size={5}>
            <Typography variant="body2">Copies</Typography>
          </Grid>
          <Grid size={7}>
            <Typography variant="body">{book.copyInStock}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BookCard;
