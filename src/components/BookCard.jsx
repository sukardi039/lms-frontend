import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { app } from "../lib/base";
// import { getDownloadURL, getStorage, ref } from "firebase/storage";

const BookCard = ({ book }) => {
  // const [url, setUrl] = useState(null);
  // const [fName, setFName] = useState(null);

  // useEffect(() => {
  //   if (url) {
  //     console.log("fName, url", fName, url);
  //     document.getElementById(fName).src = url;
  //   }
  // }, [fName, url]);

  // async function getBookImage(fileName) {
  //   setFName(fileName);
  //   if (fileName) {
  //     const storage = getStorage(app);
  //     const fileRef = ref(storage, `/${fileName}`);
  //     try {
  //       const url = await getDownloadURL(fileRef);
  //       setUrl(url);
  //       console.log(fileName, url);
  //       // document.getElementById(fileName).value = url;
  //     } catch {
  //       (error) => console.error("Error fetching file:", error);
  //     }
  //   }
  // }

  // getBookImage(book.bookImage);

  return (
    <Card margin={2} padding={2} sx={{ maxWidth: 290 }}>
      <Grid container spacing={2}>
        <Grid size={4} sx={{ justifyContent: "center" }}>
          <img
            // id={book.bookImage}
            // src={getBookImage(book.bookImage)}
            src={`${book.bookImage}`}
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
