import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Books = () => {
  const [Books, setBooks] = useState([]);
  const navigate = useNavigate(); //for navigation

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="booksMain">
      <h1>React Bookshop</h1>
      <div className="books">
        {Books.map((Book) => (
          <Card sx={{ maxWidth: 345 }} key={Book.id}>
            <CardMedia>
              {Book.cover && <img src={Book.cover} alt=" " />}
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {Book.Title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Book.Description}
              </Typography>
              <span>{Book.Price}</span>
            </CardContent>
            <Button
              className="btnUpdate"
              variant="outlined"
              style={{ marginRight: "5px", marginBottom: "5px" }}
              onClick={() => navigate(`update/${Book.id}`)}
            >
              Update
            </Button>
            <Button
              className="btnDelete"
              variant="outlined"
              color="error"
              onClick={() => handleDelete(Book.id)}
              style={{ marginBottom: "5px" }}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
      <br />
      <Button variant="contained" onClick={() => navigate("add")}>
        Add a new Book
      </Button>
    </div>
  );
};

export default Books;
