import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Button } from 'react-bootstrap';

function ListBooks() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function getAllBooks() {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    }
    getAllBooks();
  }, []);

  return (
    <>
      <h1>Books to Borrow</h1>
      {/* <div>
          {books.map((book) => {
              return <div key={book.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={book.imageUrl} alt="book cover" />
                <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <b>Review:</b> {book.review}
                </Card.Text>
                <Button variant="primary" href={`/books/${book._id}`}>More Details</Button>
                </Card.Body>
            </Card>
              </div>
          })}
      </div> */}
      {books.map((book) => {
              return <div key={book.id}>
              <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 1 }).map((_, idx) => (
                  <Col>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={book.imageUrl} alt="book cover"  />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                        <b>Review:</b> {book.review}
                        </Card.Text>
                        <Button variant="primary" href={`/books/${book._id}`}>More Details</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              </div>
      })}
    </>
  )
}
export default ListBooks;



