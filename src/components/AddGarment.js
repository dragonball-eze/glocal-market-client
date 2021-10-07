import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoggedUserConsumer } from "../context/loggedUser";
import { Form, Button } from "react-bootstrap";

function AddGarment() {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("XS");
  const [type, setType] = useState("Shoes");
  const [usage, setUsage] = useState("Brand New");
  const [imageUrl, setImageUrl] = useState("");
  const loggedInUser = useContext(LoggedUserConsumer);

  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("file", imageUrl);

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/upload`,
      uploadData
    );

    const body = {
        brand,
        size,
        type,
        usage,
        imageUrl: response.data.fileUrl,
        user: loggedInUser,
    };
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/clothes`, body);
    toast.success("New garment created!");
    history.push("/clothes");
  };

  return (
    <>
      <h2>Add A Garment</h2>
      <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="e.g. Nike" onChange={(e) => setBrand(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicSize">
          <Form.Label>Size</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setSize(e.target.value)}>
            <option></option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>Type of garment</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
            <option></option>
            <option value="Shoes">Shoes</option>
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Coat">Coat</option>
            <option value="Hat">Hat</option>
            <option value="Sweatshirt">Sweatshirt</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicUsage">
          <Form.Label>Level of Usage</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setUsage(e.target.value)}>
            <option></option>
            <option value="Brand New">Brand New</option>
            <option value="Moderately Used">Moderately Used</option>
            <option value="Vintage">Vintage</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImageUrl(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add it!
        </Button>
      </Form>
    </>
  );
}

export default AddGarment;

