import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavDropdown,
  Form,
  Nav,
  FormControl,
  Button
} from 'react-bootstrap';
import Movie from "./components/Movie"
import ReactModal from 'react-modal';
import Youtube from "@u-wave/react-youtube";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import Pagination from "react-js-pagination";

let apiKey = process.env.REACT_APP_APIKEY
let keyword = "";
let movie_List = [];
let famousMovieList = [];

function App() {

  let [movies, setMovies] = useState(null);
  let [modal, setModal] = useState(false);
  let [trailer, setTrailer] = useState('');
  let [rate, setRate] = useState(0);
  let [page, setPage] = useState(1);
  let [totalResult, setTotalResult] = useState(0);
  let [genres, setGenres] = useState([]);


  let CurrentPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
    let data = await fetch(url)
    let dataResult = await data.json();
    setTotalResult(dataResult.total_results);
    movie_List = dataResult.results;
    setMovies(dataResult.results);
    let GenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    let GenreResponse = await fetch(GenreUrl);
    let genreListObject = await GenreResponse.json();
    setGenres(genreListObject.genres);
  };

  let playmore = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1&sort_by=popularity.desc`
    let data = await fetch(url)
    let dataResult = await data.json();
    famousMovieList = dataResult.results;
  };

  useEffect(CurrentPlaying, [], []);
  useEffect(playmore, []);

  if (movies == null) {
    return <div>loading the movie</div>;
  }

  let searchByKeyword = e => {
    keyword = e.target.value;
    if (keyword === "") {
      setMovies(movie_List)
    } else {
      setMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }

  // let sortByPopularity = () => {
  //   let sortedMovie = [...movies].sort((a, b)=> b.popularity - a.popularity);
  //   setMovies([]);
  //   setMovies(sortedMovie);
  // }

  let openModal = async (movieId) => { //movie_id
    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
    let data = await fetch(url);
    let resultData = await data.json();
    setTrailer(resultData.results[0].key)
    setModal(!modal)
  };

  let searchByRate = (value) => {
    setRate(value);
    let filteredData = movie_List.filter((movie) => movie.vote_average>=value)
    setMovies(filteredData)
  }

  let handlePageChange = async pageNumber => {
    setPage(pageNumber);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    let data = await fetch(url)
    let dataResult = await data.json();
    setMovies(dataResult.results);
  }


  return (

    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Khai's Movie</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl 
            type="text" 
            placeholder="Search" 
            className="mr-sm-2" 
            onChange={e => searchByKeyword(e)} 
            />
            {/* <Button onClick={() => searchByKeyword()} variant="outline-success">
              Search
              </Button> */}
          </Form>
          {/* <Button onClick={() => sortByPopularity()} variant = "outline-success">
            most popular
          </Button> */}
        </Navbar.Collapse>
      </Navbar>

      <InputRange
        maxValue={20}
        minValue={0}
        value={rate}
        onChange={value => searchByRate(value)} />

   
      <Movie movieList={movies} genreList={genres}  openModal={openModal} />
  
      <ReactModal
        isOpen={modal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            marginRight: '-10%',
          },
          content: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            marginRight: '0%',
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "none",
          }
        }}
        onRequestClose={() => setModal(false)}>

        <Youtube video={trailer} className="video" />
      </ReactModal>

      <Pagination
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={totalResult}
        pageRangeDisplayed={5}
        onChange={handlePageChange.bind(this)}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>

  );
}

export default App;