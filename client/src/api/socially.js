import axios from "axios";

let URL;
if (process.env.NODE_ENV === "production") {
  URL = "https://socially-webapp.herokuapp.com/api/";
} else {
  URL = "http://localhost:5000/api/";
}

export default axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
  }
});