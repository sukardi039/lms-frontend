import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  /**
   * Destructures authentication-related values and functions from AuthContext.
   *
   * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
   * @property {string} username - The current user's username.
   * @property {Function} setCurrentAction - Function to set the current authentication action.
   * @property {*} param - Additional parameter from the AuthContext.
   */
  const { isAuthenticated, username, setCurrentAction, param } =
    useContext(AuthContext);

  // setCurrentAction("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !username) {
      setCurrentAction("");
      navigate("/");
    }
  });

  return (
    <>
      {isAuthenticated && (
        <Box
          sx={{
            marginTop: "30px",
          }}
        >
          <Stack>
            <Typography variant="h6">
              The followings are the terms and conditions governing members
              borrowing books from our library:
            </Typography>
            <ul>
              <li>
                Members shall take good care of the books borrowed from us. In
                the event of intentional damaged made to the books, we will
                assess the damage and charge member acdcordingly.
              </li>
              <li>
                A member can borrow maximum {param["MAX_BORROW"]} books from our
                library.
              </li>
              <li>
                Each book can be on loan to member for {param["BORROW_DAYS"]}{" "}
                days.
              </li>
              <li>
                Member may collect books borrowed through this portal from the
                book collection box, after 2pm on the next business day using
                his/her email address and password used during membership
                registration.
              </li>
              <li>
                Our business days are Monday to Friday, except public holidays.
              </li>
              <li>
                Members shall return the books borrowed on or before the stated
                date of return.
              </li>
              <li>
                Member shall register books to be returned through this portal
                and deposit the books into the book collection box, within 24
                hours, using his/her email address and password used during
                membership registration.
              </li>
              <li>
                Sensers in book deposit box will verify the exact match of books
                return against registerd books' return list. Members are
                responsible to place the exact number and title of books into
                the book deposit box. Failure to return the registered books in
                full will void the books' return list.
              </li>
              <li>
                Member may renew the borrowed book for another{" "}
                {param["BORROW_DAYS"]} days before the date of return stated
                when borrowing the book.
              </li>
              <li>Two renewal may be request for one book for each borrow. </li>
              <li>
                Late fees of ${param["PENELTY_PER_DAY"]} each day will be
                charged for each book that is not reutrned on or before the
                stated date of return. Late fee per book is capped at $
                {param["MAX_PENELTY_PER_BOOK"]} per borrow.
              </li>
              <li>
                Member will not be allowed to borrow books when any of the
                borrowed books are not return after due date.
              </li>
              <li>
                Member will be barred from borrowing books when the accumulative
                late fees reached or exceeded ${param["MAX_OUTSTANDING"]}
              </li>
              <li>
                Member whom have borrowed any book(s) from our library is
                automatocally considered as agreeing with this terms and
                conditions, and deemed to be bounded by these terms.
              </li>
              <li>
                Our library may change, add or delete these conditions when
                deemed necessary by us, without prior notice.
              </li>
            </ul>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default TermsAndConditions;
