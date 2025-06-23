/**
 * BookAdd component for adding, editing, or deleting a book entry.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {'add'|'edit'|'delete'} props.mode - The mode of the form, determines if the form is for adding, editing, or deleting a book.
 * @param {Object} props.originalData - The original data of the book to edit or delete.
 * @param {number} props.originalData.book_id - The unique identifier of the book.
 * @param {string} props.originalData.isbn - The ISBN of the book.
 * @param {string} props.originalData.title - The title of the book.
 * @param {string} props.originalData.author - The author of the book.
 * @param {string} props.originalData.category - The category of the book.
 * @param {string} props.originalData.bookImage - The URL of the book's cover image.
 * @param {string|number} props.originalData.publishedYear - The year the book was published.
 * @param {string|number} props.originalData.copyInStock - The number of copies in stock.
 * @param {Function} props.endAction - Callback function to execute after the form action is completed (e.g., refresh or close).
 *
 * @returns {JSX.Element} The rendered BookAdd form component.
 */
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

const BookAdd = ({ mode, originalData, endAction }) => {
  const [fileName, setFileName] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booklist, setBookList] = useState([]);
  const [toRedner, setToRender] = useState(true);
  const [defaultData, setDefaultData] = useState({
    book_id: 0,
    isbn: "",
    title: "",
    author: "",
    category: "",
    bookImage: "",
    publishedYear: "",
    copyInStock: "",
  });

  console.log(
    "originalData",
    originalData,
    "defaultData",
    defaultData,
    "mode",
    mode
  );
  const { control, handleSubmit, setValue, reset } = useForm();
  // set up default value

  useEffect(() => {
    setValue("isbn", originalData.isbn);
    setValue("title", originalData.title);
    setValue("author", originalData.author);
    setValue("category", originalData.category);
    setValue("bookImage", originalData.bookImage);
    setValue("publishedYear", originalData.publishedYear);
    setValue("copyInStock", originalData.copyInStock);
    setFileName("");
    if (originalData.bookImage) {
      document.getElementById("myImg").src = originalData.bookImage;
    }
  }, [originalData]);

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

  //update new book

  const onSubmitAdd = (data) => {
    console.log(data);
    if (mode === "add") {
      axios({
        method: "POST",
        url: "http://localhost:8080/api/books",
        data: data,
      })
        .then((response) => {
          resetForm();
          document.getElementById("myImg").src = null;
          // booklist.push(response.data);
          alert("Book Added Successfully");
          endAction("refresh");
          // setRefresh(!refresh);
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    }
    if (mode === "edit") {
      axios({
        method: "PUT",
        url: "http://localhost:8080/api/books/" + originalData.book_id,
        data: data,
      })
        .then((response) => {
          resetForm();
          // document.getElementById("myImg").src = null;
          alert("Book Updated Successfully");
          endAction("refresh");
          // setRefresh(!refresh);
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    }
    if (mode === "delete") {
      axios({
        method: "DELETE",
        url: "http://localhost:8080/api/books/" + originalData.book_id,
        data: data,
      })
        .then((response) => {
          resetForm();
          // document.getElementById("myImg").src = null;
          // booklist.push(response.data);
          alert("Book Deleted Successfully");
          endAction("refresh");
          // setRefresh(!refresh);
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    }
    const resetForm = () => {
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
    };
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
                  {fileName || originalData.bookImage ? (
                    <img
                      id="myImg"
                      height="350"
                      src={`${originalData.bookImage}`}
                      alt=""
                    />
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
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained" color="primary">
                    {mode === "delete" ? `Delete` : `Save`}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      endAction("close");
                    }}
                  >
                    Close
                  </Button>
                </Stack>
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
