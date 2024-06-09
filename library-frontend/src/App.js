import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, Heading, Link } from '@chakra-ui/react';
import BookList from './components/BookList';

function App() {
  return (
    <Router>
      <Box bg="teal.500" p={4} color="white">
        <Link to="/"> 
          <Heading as="h1" size="lg">Gerenciamento de Livros</Heading>
        </Link>
      </Box>
      <Container maxW="container.md" mt={4}>
        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
