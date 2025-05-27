import { Padding } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const BookGrid = ({ books }) => {
  return (
    <Grid container space={2}>
      {books.map((book) => (
        <Grid size={4} key={book.book_id}>
          <Card margin={5} Padding={3} sx={{ maxWidth: 290 }}>
            <CardMedia
              component="img"
              image={`/images/${book.bookImage}`}
              alt={book.title}
            />
            <Divider></Divider>
            <Typography paddingLeft={1} paddingRight={1} variant="h6">
              {book.title}
            </Typography>
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
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;
