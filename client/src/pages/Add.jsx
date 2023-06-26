import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setbook] = useState({
    Title: "",
    Description: "",
    Cover: "",
    Price: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setbook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book); //wait till the post compelete after navigate to homepage
      navigate("/"); //this above line send the information to the backend pages
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);

  return (
    <div className="formCss">
      <h2>Add Books</h2>

      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={handleChange}
        name="Title"
        style={{ width: "40%", marginBottom: "1rem" }}
      />
      <br />

      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        onChange={handleChange}
        name="Description"
        style={{ width: "40%", marginBottom: "1rem" }}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Cover"
        variant="outlined"
        onChange={handleChange}
        name="Cover"
        style={{ width: "40%", marginBottom: "1rem" }}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        onChange={handleChange}
        name="Price"
        style={{ width: "40%", marginBottom: "1rem" }}
      />
      <br />
      <Button
        variant="contained"
        color="success"
        onClick={handleClick}
        style={{ width: "20%", marginBottom: "1rem" }}
      >
        Add
      </Button>
      <br />
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
        style={{ width: "20%", backgroundColor: "#F5F5F5" }}
      >
        Cancle
      </Button>
    </div>
  );
};

export default Add;
