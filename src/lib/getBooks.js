import axios from "axios";

/**
 * Fetches a list of books from the API and updates state accordingly.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.setData - Function to update the data state with the fetched books.
 * @param {Function} params.setLoading - Function to update the loading state.
 * @param {Function} params.setError - Function to update the error state (currently commented out).
 */
const getBooks = ({ setData, setLoading, setError }) => {
  axios
    .get("http://localhost:8080/api/books")
    .then((response) => {
      // console.log(response);
      setData(response.data);
      setLoading(false);
    })
    .catch((err) => {
      //   setError(err.message);
      setLoading(false);
    });
};
export default getBooks;
