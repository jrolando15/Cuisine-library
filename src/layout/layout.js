import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, HStack, Link, Button } from '@chakra-ui/react';
import './layout.css'; // Import updated CSS for minimal styles

const Layout = ({ children }) => {
  return (
    <>
      <Flex
        as="header"
        className="App-header"
        align="center"
        justify="center"
        position="fixed"
        top="0"
        width="100%"
        height="60px"
        zIndex="1000"
      >
        <HStack as="nav" spacing={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Button
              bg="#006B4C"
              color="white"
              fontSize="md"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: '#008c5e' }}
              _active={{ bg: '#006c4b' }}
            >
              Home
            </Button>
          </Link>
          <Link as={RouterLink} to="/search" _hover={{ textDecoration: 'none' }}>
            <Button
              bg="#006B4C"
              color="white"
              fontSize="md"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: '#008c5e' }}
              _active={{ bg: '#006c4b' }}
            >
              Search Recipes
            </Button>
          </Link>
          <Link as={RouterLink} to="/ingredients" _hover={{ textDecoration: 'none' }}>
            <Button
              bg="#006B4C"
              color="white"
              fontSize="md"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: '#008c5e' }}
              _active={{ bg: '#006c4b' }}
            >
              Search by Ingredients
            </Button>
          </Link>
          <Link as={RouterLink} to="/random" _hover={{ textDecoration: 'none' }}>
            <Button
              bg="#006B4C"
              color="white"
              fontSize="md"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: '#008c5e' }}
              _active={{ bg: '#006c4b' }}
            >
              Random Recipes
            </Button>
          </Link>
        </HStack>
      </Flex>
      <main>{children}</main>
    </>
  );
};

export default Layout;