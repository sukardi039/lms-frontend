import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const {
    isAuthenticated,
    username,
    setThisBook,
    thisBook,
    setRefresh,
    refresh,
    setCurrentAction,
  } = useContext(AuthContext);

  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [outstanding, setOutstanding] = useState(0);
  const [bid, setBid] = useState(0);
  const [penelty, setPenelty] = useState(0);

  setCurrentAction("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !username) {
      setCurrentAction("");
      navigate("/");
    }
  });

  useEffect(() => {
    let url = "http://localhost:8080/api/books/outstanding";
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        let data = response.data;
        //   console.log("data", data);
        data.forEach((e) => {
          let buff = e.anything.split("^");
          e.penelty = parseFloat(buff[0]);
          e.borrow_id = parseInt(buff[1]);
          e.name = buff[2];
        });
        //   console.log("af data", data);
        setBookList(data);
        //   console.log(data);
        // response.data.forEach((e) => {
        //   console.log(outstanding, e.anything, parseFloat(e.anything));
        //   setOutstanding(prevOutstanding => prevOutstandings + parseFloat(e.anything));
        // });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username.user_id, refresh]);

  const payThisBook = (borrow_id, penelty) => {
    let url = "http://localhost:8080/api/borrowedbooks/pay/" + borrow_id;
    axios
      .put(url)
      .then((response) => {
        // console.log(response);
        if (response.data.peneltyPaid == penelty) {
          alert("Payment $" + penelty + " received!");
        }
        //   console.log("data", data);
        setRefresh(!refresh);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  console.log(bookList);

  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        <Stack>
          <Typography variant="h6">
            Acknowledge receipt of payments for the following fees
          </Typography>
          <TableContainer sx={{ display: bookList.length ? "block" : "none" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookList.map((row) => (
                  <TableRow
                    variant="body2"
                    key={row.book_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell align="right">
                      {row.penelty.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          {
                            payThisBook(row.borrow_id, row.penelty);
                          }
                        }}
                      >
                        Paid
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </>
  );
};

export default Payment;
