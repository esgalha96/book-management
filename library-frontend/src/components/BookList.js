import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Typography, List, ListItem, ListItemText, Container } from '@mui/material';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3003/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      
      <List>
        {books.map(book => (
          <ListItem key={book._id}>
            <ListItemText primary={`${book.name} by ${book.author.name} ${book.author.surname}`} />
          </ListItem>
        ))}
      </List>
      <Link to="/add-book" style={{ textDecoration: 'none', marginRight: '10px' }}>
        <Button variant="contained" color="primary">Add Book</Button>
      </Link>
      <Link to="/add-author" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary">Add Author</Button>
      </Link>
    </Container>
  );
};

export default BookList;
