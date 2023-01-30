import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Book } from './model/Book';
import { pink } from '@mui/material/colors';
import EditForm from './components/EditForm';

function App() {
  
  const [books, setBooks] = useState<Book[]>();
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [searchText, setSearchText] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
 

  useEffect(() => {
  axios.get('http://localhost:8080/books').then((response)=>setBooks(response.data))
  },[]);

  useEffect(() => {
    axios.get('http://localhost:8080/books/author/'+searchText).then((response)=>setBooks(response.data));
  }, [searchText]
  );

  useEffect(()=> {
    axios.get('http://localhost:8080/books/genre/'+genre).then((response)=>setBooks(response.data))
  }, [genre]
  )

  const onBookClicked = (id: number) =>{
    axios.get('http://localhost:8080/books/'+id).then((response)=>setSelectedBook(response.data));
  }
  
  const clearSelectedBook = () => {
    setSelectedBook(undefined);
  }
  return (

      <Box className="App" sx={{backgroundColor: 'pink', height: 1, display: "flex", flexDirection: "column" }}>
        <Box>
        <img src='https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-e1464023124869.jpeg'></img>
        </Box>
        <Box sx = {{width: 1, display: "flex" }}>
          <FormControl sx={{margin: 1, width: 200}}>
            <InputLabel sx={{margin:1, mr:2}}> Book Genre </InputLabel>
         <Select
           value = {genre}
           label = "genre"
           onChange= {(e)=>setGenre(e.target.value)}>
           
           <MenuItem value= "FANTASY"> Fantasy</MenuItem>
           <MenuItem value = "SCIENCE_FICTION">Science-fiction</MenuItem>
         </Select>
         </FormControl>
          <TextField sx= {{margin:1, mr:2}} label="Search by author" value={searchText} onChange={(e)=> setSearchText(e.target.value)} ></TextField>
        </Box>
        <EditForm>trilili</EditForm> 
        {selectedBook && <Card sx= {{margin:2, overflow: "unset"}}>
          <Button onClick ={() => clearSelectedBook()}> Close </Button>
          <Typography fontSize={"big"}> Title: {selectedBook.title} </Typography>
         <Typography fontSize={"big"}> Author: {selectedBook.author} </Typography>
         <Typography fontSize={"big"}> Genre: {selectedBook.genre} </Typography>
         </Card>}
         <Box sx={{overflow : "auto"}}>
        {books?.map(book => 
        <Card sx={{margin:2, cursor: "pointer"}} onClick={()=>onBookClicked(book.id)}>
         <CardContent> {book.title} </CardContent>
          </Card>
        )}
        </Box>
      </Box>
  );
}

export default App;


