import axios from "axios";

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
