import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoggedUserConsumer } from "../context/loggedUser";
import { Form, Button } from "react-bootstrap";

function AddBook() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [review, setReview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  /* const [library, setLibrary] = useState([]); */
  const loggedInUser = useContext(LoggedUserConsumer);


  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    /* const arr = this.state.arr; */

    const uploadData = new FormData();
    uploadData.append("file", imageUrl);

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/upload`,
      uploadData
    );

    const body = {
      author,
      title,
      genre,
      language,
      review,
      imageUrl: response.data.fileUrl,
      user: loggedInUser,
    };

    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/books`, body);
    toast.success("New book created!");
    history.push("/books");
  };

  return (
    <>
      <h2>Add A Book</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="e.g. Akira Toriyama" onChange={(e) => setAuthor(e.target.value)}  />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="e.g. DragonBall Z" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" placeholder="e.g. Manga" onChange={(e) => setGenre(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicLanguage">
          <Form.Label>Language</Form.Label>
          <Form.Control type="text" placeholder="e.g. Japanese" onChange={(e) => setLanguage(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicReview">
          <Form.Label>Review</Form.Label>
          <Form.Control type="text" placeholder="e.g. DragonBall has taught me more than my college." onChange={(e) => setReview(e.target.value)}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImageUrl(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add this book!
        </Button>
    </Form>
    </>
  );
}

export default AddBook;


