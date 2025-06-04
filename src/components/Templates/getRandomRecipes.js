import React, { useState } from 'react';
import { Box,  Heading,  Text,  Button,  SimpleGrid,  VStack,  Center,  HStack,} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaRandom } from "react-icons/fa";
import { getRandomRecipes } from '../../services/apiService';
import SearchBar from '../searchBar';
import SimilarRecipes from './SimilarRecipes';

const MAX_RECIPES = 10;

const RandomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [number, setNumber] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const navigate = useNavigate();

  const fetchRandomRecipes = async () => {
    setLoading(true);
    setError(null);
    const num = Math.max(1, Math.min(Number(number) || 1, MAX_RECIPES));
    try {
      const data = await getRandomRecipes(num);
      setRecipes(data.recipes);
      setShowSearchBar(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchRandomRecipes();
  };

  const handleNewSearch = () => {
    setRecipes([]);
    setShowSearchBar(true);
    setNumber('');
    setError(null);
  };

  const handleViewDetails = (recipeId) => {
    navigate(`/recipe-details/${recipeId}`);
  };

  // Split recipes for 4-3-3 layout
  const splitRecipes = (recipes) => {
    const firstRow = recipes.slice(0, 4);
    const secondRow = recipes.slice(4, 7);
    const thirdRow = recipes.slice(7, 10);
    return [firstRow, secondRow, thirdRow];
  };

  return (
    <Box className="recipe-search-container" pt={0} position="relative">
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
                  <Heading as="h1" size="xl" color="#000000">Random Recipes</Heading>                                              
                  <FaRandom size={24} color="#00A170" />
                </HStack> 
                <Box w="100%" maxW="600px">
                  <SearchBar
                    placeholder="Enter number of recipes (max 10)"
                    value={number}
                    onChange={(value) => setNumber(value.replace(/[^0-9]/g, ''))}
                    onSearch={handleSearch}
                    disabled={loading}
                  />
                </Box>
                <Text color="#333333" fontSize="lg">
                  Discover delicious recipes at random!
                </Text>
                <Text color="#333333" fontSize="md" textAlign="center">
                  Note: Enter a number from 1 to 10.
                </Text>  
              </>
            ) : null}
            {error && (
              <Text
                color="red.600"
                bg="red.50"
                border="1px solid"
                borderColor="red.300"
                borderRadius="md"
                p={2}
                px={4}
                textAlign="center"
                fontSize="md"
                maxW="400px"
                w="100%"
              >
                {error}
              </Text>
            )}
          </VStack>

          {/* Stage 2: Results Grid */}
          {!showSearchBar && recipes.length > 0 && (
            <VStack spacing={8}>
              {/* First row: 4 columns */}
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} w="100%">
                {splitRecipes(recipes)[0].map((recipe) => (
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
                    width="100%"
                    height="250px"
                    aspectRatio="1/1"
                  >
                    <Heading as="h2" size="md" color="gray.800" mb={3} textAlign="center" overflowWrap="break-word">
                      {recipe.title}
                    </Heading>
                    <HStack spacing={2} justify="center" mt="auto">
                      <Button
                        bg="#00A170"
                        color="white"
                        fontSize="xs"
                        px={3}
                        py={1}
                        borderRadius="md"
                        _hover={{ bg: '#008c5e' }}
                        onClick={() => handleViewDetails(recipe.id)}
                        aria-label={`View details for ${recipe.title}`}
                      >
                        View Details
                      </Button>
                      <SimilarRecipes recipeId={recipe.id} />
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
              {/* Second row: 3 columns */}
              {splitRecipes(recipes)[1].length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
                  {splitRecipes(recipes)[1].map((recipe) => (
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
                      width="100%"
                      height="250px"
                      aspectRatio="1/1"
                    >
                      <Heading as="h2" size="md" color="gray.800" mb={3} textAlign="center" overflowWrap="break-word">
                        {recipe.title}
                      </Heading>
                      <HStack spacing={2} justify="center" mt="auto">
                        <Button
                          bg="#00A170"
                          color="white"
                          fontSize="xs"
                          px={3}
                          py={1}
                          borderRadius="md"
                          _hover={{ bg: '#008c5e' }}
                          onClick={() => handleViewDetails(recipe.id)}
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
              {/* Third row: 3 columns */}
              {splitRecipes(recipes)[2].length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
                  {splitRecipes(recipes)[2].map((recipe) => (
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
                      width="100%"
                      height="250px"
                      aspectRatio="1/1"
                    >
                      <Heading as="h2" size="md" color="gray.800" mb={3} textAlign="center" overflowWrap="break-word">
                        {recipe.title}
                      </Heading>
                      <HStack spacing={2} justify="center" mt="auto">
                        <Button
                          bg="#00A170"
                          color="white"
                          fontSize="xs"
                          px={3}
                          py={1}
                          borderRadius="md"
                          _hover={{ bg: '#008c5e' }}
                          onClick={() => handleViewDetails(recipe.id)}
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
            </VStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default RandomRecipes;













