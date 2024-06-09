import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Heading, List, ListItem, Box, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton,
  Input, Select, useDisclosure
} from '@chakra-ui/react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookName, setBookName] = useState('');
  const [bookPages, setBookPages] = useState(0);
  const [bookAuthor, setBookAuthor] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorSurname, setAuthorSurname] = useState('');

  const { isOpen: isBookModalOpen, onOpen: onBookModalOpen, onClose: onBookModalClose } = useDisclosure();
  const { isOpen: isAuthorModalOpen, onOpen: onAuthorModalOpen, onClose: onAuthorModalClose } = useDisclosure();


  const fetchBooks = () => {
    axios.get('http://127.0.0.1:3003/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  };

  const deleteBook = (id) => {
    let validacao;
    validacao = confirm(`Deseja deletar o book ${id}?`) // eslint-disable-line no-restricted-globals
    if(validacao){ 
      axios.delete(`http://127.0.0.1:3003/books/${id}`)
      .then(response => {
        fetchBooks();
        onBookModalClose();
      })
      .catch(error => {
        console.error("There was an error delete the books!", error);
      });
    }
    else{
      alert("Nenhum book deletado!") // eslint-disable-line no-restricted-globals
    }
  };

  useEffect(() => {
    fetchBooks();
    axios.get('http://127.0.0.1:3003/authors')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the authors!", error);
      });
  }, []);

  const handleAddBook = () => {
    axios.post('http://127.0.0.1:3003/books', { name: bookName, pages: bookPages, author: bookAuthor })
      .then(response => {
        fetchBooks(); // Refresh the book list
        onBookModalClose();
      })
      .catch(error => {
        console.error("There was an error creating the book!", error);
      });
  };

  const handleAddAuthor = () => {
    axios.post('http://127.0.0.1:3003/authors', { name: authorName, surname: authorSurname })
      .then(response => {
        setAuthors([...authors, response.data]);
        onAuthorModalClose();
      })
      .catch(error => {
        console.error("There was an error creating the author!", error);
      });
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Books</Heading>
      <List spacing={3}>
        {books.map(book => (
          <ListItem key={book._id}>
            <Text>
              <Button backgroundColor={"black"} color={"red"} onClick={() => deleteBook(book._id)}><i class="material-icons">close</i></Button> 
              {book.name} by {book.author.name} {book.author.surname}
            </Text>
          </ListItem>
        ))}
      </List>
      <Box mt={4}>
        <Button colorScheme="teal" mr={3} onClick={onBookModalOpen}>Add Book</Button>
        <Button colorScheme="teal" onClick={onAuthorModalOpen}>Add Author</Button>
      </Box>

      {/* Modal for Adding Book */}
      <Modal isOpen={isBookModalOpen} onClose={onBookModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Book Name"
              mb={3}
              value={bookName}
              onChange={e => setBookName(e.target.value)}
              required
            />
            <Input
              placeholder="Pages"
              type="number"
              mb={3}
              value={bookPages}
              onChange={e => setBookPages(parseInt(e.target.value))}
              required
            />
            <Select
              placeholder="Select Author"
              mb={3}
              value={bookAuthor}
              onChange={e => setBookAuthor(e.target.value)}
              required
            >
              {authors.map(author => (
                <option key={author._id} value={author._id}>
                  {author.name} {author.surname}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddBook}>Add Book</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Adding Author */}
      <Modal isOpen={isAuthorModalOpen} onClose={onAuthorModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Author</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="First Name"
              mb={3}
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              required
            />
            <Input
              placeholder="Surname"
              mb={3}
              value={authorSurname}
              onChange={e => setAuthorSurname(e.target.value)}
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddAuthor}>Add Author</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookList;
