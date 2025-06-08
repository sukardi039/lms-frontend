import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Stack, Typography } from "@mui/material";

const TermsAndConditions = () => {
  const { setIsAuthenticated, setUsername, setThisBook, setCurrentAction } =
    useContext(AuthContext);
  setCurrentAction("");
  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        <Stack>
          <Typography variant="h6">
            The followings are the terms and conditions governing members
            borrowing books from our library:
          </Typography>
          <ul>
            <li>
              Members shall take good care of the books borrowed from us. In the
              event of intentional damaged made to the books, we will assess the
              damage and charge member acdcordingly.
            </li>
            <li>A member can borrow maximum 3 books from our library.</li>
            <li>Each book can be on loan to member for 14 days.</li>
            <li>
              Members shall return the books borrowed on or before the stated
              date of return.
            </li>
            <li>
              Member may renew the borrowed book for another 14 days before the
              date of return stated when borrowing the book.
            </li>
            <li>One renewal may be request for one book for each borrow. </li>
            <li>
              Late fees of $0.50 each day will be charged for each book that is
              not reutrned on or before the stated date of return.
            </li>
            <li>
              Member will not be allowed to borrow books when any on the
              borrowed books are not return after the date of return.
            </li>
            <li>
              Member will be barred from borrowing books when the accumulative
              late fees reached or exceeded $20.00
            </li>
            <li>
              Member whom have borrowed any book(s) from our library is
              automatocally considered as agreeing with this terms and
              conditions, and deemed to be bounded by thee terms.
            </li>
            <li>
              Our library may change, make additions or deletions to these
              conditions without prior notice.
            </li>
          </ul>
        </Stack>
      </Box>
    </>
  );
};

export default TermsAndConditions;
