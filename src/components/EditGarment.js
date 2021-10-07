import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function EditGarment({ match }) {
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [usage, setUsage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

  const history = useHistory();

  useEffect(() => {
    async function getBook() {
      const garment = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/clothes/${match.params.id}`
      );

      setBrand(garment.data.brand);
      setSize(garment.data.size);
      setType(garment.data.type);
      setUsage(garment.data.usage);
      setImageUrl(garment.data.imageUrl);
    }
    getBook();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      brand,
      size,
      type,
      usage,
      imageUrl,
    };

    await axios.put(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/clothes/${match.params.id}`,
      body
    );

    toast.success("Garment updated");
    history.push("/clothes");
  };

  return (
    <>
      <h2>Edit Garment</h2>
      <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="e.g. Nike" onChange={(e) => setBrand(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicSize">
          <Form.Label>Size</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setSize(e.target.value)}>
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

export default EditGarment;