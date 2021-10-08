import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";

function ListClothes() {
  const [clothes, setClothes] = useState([]);
  /*   const [user, setUser] = useState({}); */

  useEffect(() => {
    async function getAllClothes() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/clothes`
      );
      console.log(response.data);
      setClothes(response.data);
      /* setUser(response.data); */
    }
    getAllClothes();
  }, []);

  return (
    <>
      <h1>Clothes to Borrow</h1>
      {/* {clothes.map((garment) => {
        return <div key={garment.id}>
        <Row xs={1} md={2} className="g-4">
          {Array.from({ length: 1 }).map((_, idx) => (
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={garment.imageUrl} alt="garment" />
                <Card.Body>
                  <Card.Title>{garment.brand} {garment.type}</Card.Title>
                  <Card.Text>
                  Kindly proposed by: {user.username}
                  </Card.Text>
                  <Button variant="primary" href={`/clothes/${garment._id}`}>More Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </div>
      })} */}

      <Row md={3}>
        {clothes.map((garment) => {
          return (
            <div key={garment.id}>
              {Array.from({ length: 1 }).map((_, idx) => (
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={garment.imageUrl}
                      alt="garment"
                    />
                    <Card.Body>
                      <Card.Title>
                        {garment.brand} {garment.type}
                      </Card.Title>
                      <Card.Text>
                        Kindly proposed by: {garment.user.username}
                      </Card.Text>
                      <Button
                        variant="primary"
                        href={`/clothes/${garment._id}`}
                      >
                        More Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </div>
          );
        })}
      </Row>
    </>
  );
}
export default ListClothes;
