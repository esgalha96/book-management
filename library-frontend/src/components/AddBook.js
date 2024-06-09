import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, MenuItem, Typography, Box } from '@mui/material';

const AddBook = () => {
  const [name, setName] = useState('');
  const [pages, setPages] = useState(0);
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3003/authors')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the authors!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:3003/books', { name, pages, author: authorId })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error creating the book!", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add Book
        </Typography>
        <TextField
          label="Book Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          label="Pages"
          type="number"
          fullWidth
          margin="normal"
          value={pages}
          onChange={e => setPages(parseInt(e.target.value))}
          required
        />
        <TextField
          select
          label="Author"
          fullWidth
          margin="normal"
          value={authorId}
          onChange={e => setAuthorId(e.target.value)}
          required
        >
          <MenuItem value="">
            <em>Select an author</em>
          </MenuItem>
          {authors.map(author => (
            <MenuItem key={author._id} value={author._id}>
              {author.name} {author.surname}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Book
        </Button>
      </Box>
    </Container>
  );
};

export default AddBook;
