import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { app } from "../lib/base";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import BookGrid from "./BookGrid";
import BookCard from "./BookCard";

const BookAdd = () => {
  const [fileName, setFileName] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booklist, setBookList] = useState([]);

  // read book list

  // const [imageValue, setImageValue] = useState(null);

  // get image file link and save to bookImage field
  useEffect(() => {
    if (fileName) {
      const storage = getStorage(app);
      const fileRef = ref(storage, `/${fileName}`);
      getDownloadURL(fileRef)
        .then((url) => {
          setFileUrl(url);
          document.getElementById("myImg").src = url;
          setValue("bookImage", url);
          // document.getElementById("bookImage").value = fileName;
        })
        .catch((error) => console.error("Error fetching file:", error));
    }
  }, [fileName]);

  // upload biook image to firebase

  const uploadFile = async (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const storage = getStorage(app);
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file).then((uploadResult) => {
        // console.log("Uploaded a file");
        // console.log("Metadata:", uploadResult.metadata.fullPath);
        setFileName(uploadResult.metadata.fullPath);
        // setImageValue(uploadResult.metadata.fullPath);
        // setValue("bookImage", uploadResult.metadata.fullPath);
      });
    }
  };

  const { control, handleSubmit, setValue, reset } = useForm();

  //update new book

  const onSubmitAdd = (data) => {
    // console.log(data);
    axios({
      method: "POST",
      url: "http://localhost:8080/api/books",
      data: data,
    })
      .then((response) => {
        reset({
          isbn: "",
          title: "",
          author: "",
          category: "",
          bookImage: "",
          publishedYear: "",
          copyInStock: "",
          book_id: "",
        });
        document.getElementById("myImg").src = null;
        // booklist.push(response.data);
        alert("Book Added Successfully");
        setRefresh(!refresh);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitAdd)}
        sx={{ p: 2, width: 1 }}
      >
        <Box sx={{ width: 1 }}>
          <Stack direction="row">
            <Box sx={{ width: "30%" }}>
              <Stack spacing={3}>
                <Box>
                  {fileName ? (
                    <img id="myImg" height="350" src="" alt="" />
                  ) : (
                    <Typography>Upload a Cover Image</Typography>
                  )}
                </Box>
                <Box>
                  <input type="file" name="picture" onChange={uploadFile} />
                </Box>
              </Stack>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Stack spacing={2}>
                <Controller
                  name="isbn"
                  control={control}
                  rules={{
                    required: "ISBN is required",
                    // pattern: {
                    //   value: /^(?:\d{9}X|\d{10}|97[89]\d{10})$/,
                    //   message: "Invalid ISBN format",
                    // },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="ISBN"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Book Title is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Title"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="author"
                  control={control}
                  rules={{ required: "Book Author is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Author"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Category"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="bookImage"
                  control={control}
                  rules={{ required: "Please Upload a Book Cover Image" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      id="bookImage"
                      variant="standard"
                      label="Book Image"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      disabled
                    />
                  )}
                />
                <Controller
                  name="publishedYear"
                  control={control}
                  rules={{
                    required: "Year of Publication is required",
                    min: 1,
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Year of Publication"
                      type="number"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="copyInStock"
                  control={control}
                  rules={{
                    required: "Copies in Collection is required",
                    min: 1,
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Copies in Collection"
                      type="number"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Divider></Divider>
    </>
  );
};

export default BookAdd;
