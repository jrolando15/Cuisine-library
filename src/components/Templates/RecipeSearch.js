import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Heading, Text, SimpleGrid, Button, HStack, IconButton, Center } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import SearchBar from '../searchBar';
import { FaBook } from "react-icons/fa";
import SimilarRecipes from './SimilarRecipes';
import { searchRecipes } from '../../services/apiService';

const RecipeSearch = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.resetSearchBar) {
      setShowSearchBar(true);
      setPage(1);
      setAllRecipes([]);
    }
  }, [location.state]);

  // Pagination logic for 4 results per page
  const getPageRecipes = () => {
    const startIndex = (page - 1) * 4;
    return allRecipes.slice(startIndex, startIndex + 4);
  };

  const recipes = getPageRecipes();
  const totalPages = Math.ceil(allRecipes.length / 4) || 1;

  const handleSearch = async () => {
    setError('');
    try {
      const data = await searchRecipes(query, 10);
      setAllRecipes(data.results || []);
      setPage(1);
      setShowSearchBar(false);
    } catch (err) {
      setError('Retype your search');
      setAllRecipes([]);
      setShowSearchBar(true);
    }
  };

  const handleNewSearch = () => {
    setAllRecipes([]);
    setQuery('');
    setShowSearchBar(true);
    setPage(1);
    setError('');
  };

  const handleViewDetails = (recipeId) => {
    navigate(`/recipe-details/${recipeId}`);
  };

  const CustomPagination = () => (
    <HStack spacing={2} justify="center" mt={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous page"
        onClick={() => setPage(p => Math.max(1, p - 1))}
        isDisabled={page === 1}
        bg="#00A170"
        color="white"
        _hover={{ bg: '#008c5e' }}
      />
      
      <HStack spacing={1}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <Button
            key={p}
            onClick={() => setPage(p)}
            bg={page === p ? "#00A170" : "white"}
            color={page === p ? "white" : "#00A170"}
            _hover={{ bg: page === p ? "#008c5e" : "gray.100" }}
            minW="40px"
          >
            {p}
          </Button>
        ))}
      </HStack>

      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next page"
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        isDisabled={page === totalPages}
        bg="#00A170"
        color="white"
        _hover={{ bg: '#008c5e' }}
      />
    </HStack>
  );

  return (
    <Box className="recipe-search-container"  pt={0} position="relative">
      <VStack spacing={6} width="100%">
        {/* "New Search" button centered above the results container */}
        {!showSearchBar && (
          <Center w="100%" mb={2}>
            <Button
              onClick={handleNewSearch}
              bg="#00A170"
              color="white"
              fontSize="sm"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: '#008c5e' }}
              aria-label="Start a new search"
            >
              New Search
            </Button>
          </Center>
        )}
        
        {/* Results container (white box) */}
        <Box bg="rgba(255,255,255,0.9)" p={1} borderRadius="lg" boxShadow="md" maxW="1400px" w="90%" mx="auto">
          <VStack spacing={1} align="center" mb={5}>
            {showSearchBar ? (
              <>
                <HStack as="h1" spacing={2} align="center" justify="center">
                  <Heading as="h1" size="xl" color="#000000">Recipe Search</Heading>
                  <FaBook size="24px" color="#00A170" />
                </HStack>
                <Box w="100%" maxW="600px">
                  <SearchBar
                    placeholder="Search recipes"
                    value={query}
                    onChange={setQuery}
                    onSearch={handleSearch}
                    disabled={!query}
                  />
                </Box>
                <Text color="#33333" fontSize="lg">
                  Your next favorite dish is just a search away!
                </Text>
                <Text color="#33333" fontSize="md" textAlign="center">
                  Note: Search by name of cuisine
                </Text>
              </>
            ) : null}
            {error && (
              <Text color="red.600" bg="red.50" border="1px solid" borderColor="red.300"
                borderRadius="md" p={2} px={4} textAlign="center" fontSize="md" maxW="400px" w="100%">
                {error}
              </Text>
            )}
          </VStack>

          {recipes.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
              {recipes.map((recipe) => (
                <Box
                  key={recipe.id}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={4}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  boxShadow="sm"
                  _hover={{ transform: 'scale(1.05)' }}
                  // Make each box a perfect square with fixed dimensions
                  width="100%"
                  height="250px"
                  aspectRatio="1/1"
                >
                  <Heading as="h2" size="md" color="gray.800" mb={3} textAlign="center" overflowWrap="break-word">
                    {recipe.title}
                  </Heading>
                  {/* The mt="auto" pushes the buttons to the bottom */}
                  <HStack spacing={2} justify="center" mt="auto">
                    <Button
                      onClick={() => handleViewDetails(recipe.id)}
                      bg="#00A170"
                      color="white"
                      fontSize="xs"
                      px={3}
                      py={1}
                      borderRadius="md"
                      _hover={{ bg: '#008c5e' }}
                      aria-label={`View details for ${recipe.title}`}
                    >
                      View Details
                    </Button>
                    <SimilarRecipes recipeId={recipe.id} />
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
        
        {/* Pagination moved below the results container */}
        {recipes.length > 0 && (
          <Center w="100%" mt={2}>
            <CustomPagination />
          </Center>
        )}
      </VStack>
    </Box>
  );
};

export default RecipeSearch;


