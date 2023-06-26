import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express(); //we can send reqests without this middleware from client

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Missaka11",
  database: "schemaReact",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("This is the backend get method");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`Title`, `Description`,`Cover`, `Price`) VALUES (?)";
  const values = [
    req.body.Title,
    req.body.Description,
    req.body.Cover,
    req.body.Price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `Title` = ?, `Description` = ?, `Cover` = ?, `Price` = ? WHERE id = ?";
  const values = [
    req.body.Title,
    req.body.Description,
    req.body.Cover,
    req.body.Price,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
