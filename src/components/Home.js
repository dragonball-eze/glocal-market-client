import React from "react";
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import image1 from "../images/7a.png";
import image2 from "../images/conscious.jpg";
import image3 from "../images/reduce-reuse-recycle-sign-set.jpg";
import image4 from "../images/swap-books.jpg";
import image5 from "../images/swap-clothes.jpg";

function Home(){
    return(
        <>
        <Container>
            <Row>
                <h1>Welcome to the Glocal Market</h1>
            </Row>
            <Row>
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                        style={{width: '10rem', height: 400}}
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                        />
                        {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        style={{width: '10rem', height: 400}}
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                        />

                        {/* <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        style={{width: '10rem', height: 400}}
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                        />

                        {/* <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                </Carousel>
            </Row>
            <br/>
            <Row>
                <h2>From Swipe to Swap!</h2>
            </Row>
            <Row>
                <Col>
                <img
                        className="d-block w-100"
                        src={image4}
                        alt="Third slide"
                        />
                </Col>                
                <Col>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Col>
            </Row>
            <br/>
            <Row>
                <Col>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Col>
                <Col>
                <img
                        className="d-block w-100"
                        src={image5}
                        alt="Third slide"
                        />
                </Col>
            </Row>
            <Row>
                <h2>Don't judge a book by its cover!</h2>
            </Row>
        </Container>
        </>
    )
}

export default Home;