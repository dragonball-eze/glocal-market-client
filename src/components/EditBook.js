import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function EditBook({ match }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [review, setReview] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const history = useHistory();

  useEffect(() => {
    async function getBook() {
      const book = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/books/${match.params.id}`
      );

      setAuthor(book.data.author);
      setTitle(book.data.title);
      setGenre(book.data.genre);
      setLanguage(book.data.language);
      setReview(book.data.review);
      setImageUrl(book.data.imageUrl);
    }
    getBook();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      author,
      title,
      genre,
      language,
      review,
      imageUrl,
    };

    console.log(body);

    await axios.put(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/books/${match.params.id}`,
      body
    );

    toast.success("Book updated");
    history.push("/books");
  };

  return (
    <>
      <h2>Edit Book</h2>

      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="e.g. Akira Toriyama" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="e.g. DragonBall Z" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" placeholder="e.g. Manga" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicLanguage">
          <Form.Label>Language</Form.Label>
          <Form.Control type="text" placeholder="e.g. Japanese" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicReview">
          <Form.Label>Review</Form.Label>
          <Form.Control type="text" placeholder="e.g. DragonBall has taught me more than my college." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImageUrl(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
    </Form>
      {/* <form onSubmit={handleFormSubmit}>
        <label>Author: </label>
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />

        <label>Title: </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Genre: </label>
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />

        <label>Language: </label>
        <input
          type="text"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        />

        <label>Review: </label>
        <input
          type="text"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        />

        <label>Image: </label>
        <input type="file" onChange={(e) => setImageUrl(e.target.files[0])} />

        <button type="submit">Update</button>
      </form> */}
    </>
  );
}

export default EditBook;


