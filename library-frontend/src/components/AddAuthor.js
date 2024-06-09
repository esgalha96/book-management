import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const AddAuthor = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:3003/authors', { name, surname })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error creating the author!", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add Author
        </Typography>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          label="Surname"
          fullWidth
          margin="normal"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Author
        </Button>
      </Box>
    </Container>
  );
};

export default AddAuthor;
