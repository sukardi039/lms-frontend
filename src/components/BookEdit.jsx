import {
  Box,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookTable from "./BookTable";
import BookAdd from "./BookAdd";

const BookEdit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        // console.log(response);
        setData(response.data);
        console.log("data", data, "loading", loading);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const clickAction = (actionType, id) => {
    switch (actionType) {
      case "edit":
        console.log("edit", id);
        setMode(actionType);
        setId(id);
        // navigate("/books/edit/" + id);
        break;
      case "delete":
        console.log("delete", id);
        setMode(actionType);
        setId(id);
        // navigate("/books/delete/" + id);
        break;
      case "add":
        console.log("add", id);
        setMode(actionType);
        setId(0);
        break;
      default:
        setMode("");
        break;
    }
  };

  return (
    <>
      <Box sx={{ width: 1 }}>
        <Stack>
          {mode ? (
            <BookAdd />
          ) : (
            <Typography
              variant="h6"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              Please select an action to maintain the collection of books.
            </Typography>
          )}
          <Box flex={4} p={{ xs: 0, md: 2 }}>
            {loading ? (
              <Stack spacing={1}>
                <Skeleton variant="text" height={100} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="rectangular" height={300} />
              </Stack>
            ) : (
              <BookTable booklist={data} clickAction={clickAction}></BookTable>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default BookEdit;
