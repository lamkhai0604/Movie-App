import React from 'react'
import { Card,ListGroup,ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Movie(props) {

     let htmlMovie = props.movieList.map((movie)=>{
         return (
            <Card  className="col-md-4"style={{ width: "18rem" }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
            <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link onClick={()=>props.openModal(movie.id)}>Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
         )
     })
    return (
        <div className="row"> 
            {htmlMovie}
        </div>
    )
}