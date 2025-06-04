import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCarrot } from 'react-icons/gi';
import { Icon } from '@chakra-ui/react';
import { Box, Heading, VStack, SimpleGrid, Button, Center, HStack, Text } from '@chakra-ui/react';
import { searchRecipesByIngredients } from '../../services/apiService';
import SearchBar from '../searchBar';
import SimilarRecipes from './SimilarRecipes';
import './searchRecipeByIngredients.css';


const SearchRecipesByIngredients = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchRecipesByIngredients(ingredients);
      setRecipes(data.slice(0, 10));
      setShowSearchBar(false);
    } catch (err) {
      setError(err.message);
      setShowSearchBar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setRecipes([]);
    setIngredients('');
    setShowSearchBar(true);
    setError(null);
  };

  const handleViewDetails = (recipeId) => {
    navigate(`/recipe-details/${recipeId}`);
  };

  const firstRow = recipes.slice(0, 4);
  const secondRow = recipes.slice(4, 7);
  const thirdRow = recipes.slice(7, 10);

  return (
    <Box
      className="search-recipes-container"
      pt={1}
      position="relative"
    >
      <VStack spacing={6} width="100%">
        {!showSearchBar && recipes.length > 0 && (
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

        <Box
          bg="rgba(255,255,255,0.9)"
          p={5}
          borderRadius="lg"
          boxShadow="md"
          maxW="1400px"
          w="90%"
          mx="auto"
        >
          <VStack spacing={0} width="100%" align="center">
            {showSearchBar && (
              <>
                <HStack as="h1" spacing={2} align="center" justify="center">
                  <Heading size="xl" color="#000000" mb={0}>
                    Recipes by Ingredients
                  </Heading>
                  <Icon as={GiCarrot} boxSize={8} color="#00A170" />
                </HStack>             
                <Box w="100%" maxW="600px">
                  <SearchBar
                    placeholder="Enter ingredients"
                    value={ingredients}
                    onChange={setIngredients}
                    onSearch={handleSearch}
                    disabled={loading || !ingredients}
                    width={["100%", "80%", "60%"]}
                    bg="rgba(255,255,255,0.9)"
                    borderColor="rgba(0, 0, 0, 0.1)"
                    css={{ 
                      "--focus-color": "#00A170",
                      backdropFilter: "blur(10px)"
                    }}
                  />
                </Box>
                <Text color="#33333" fontSize="lg">
                  Your next favorite dish is just a search away!
                </Text>
                <Text color="#33333" fontSize="md" textAlign="center">
                  Note: Separate with commas.
                </Text>  
              </>
            )}

            {error && (
              <div style={{ color: 'red', fontSize: '1rem', textAlign: 'center', marginBottom: '1rem' }}>
                Error: {error}
              </div>
            )}

            {recipes.length > 0 && (
              <VStack spacing={6} width="100%">
                {firstRow.length > 0 && (
                  <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
                    {firstRow.map((recipe, index) => (
                      <Box
                        key={index}
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="lg"
                        p={4}
                        display="flex"
                        flexDirection="column"
                        boxShadow="sm"
                        _hover={{ transform: 'scale(1.05)' }}
                        width="100%"
                        height="300px"
                        aspectRatio="1/1"
                      >
                        {/* Content container */}
                        <Box
                          display="flex"
                          flexDirection="column"
                          flex="1"
                        >
                          {/* Title with larger margin from the top */}
                          <Heading
                            as="h2"
                            size="sm"
                            color="gray.800"
                            textAlign="center"
                            overflowWrap="break-word"
                            lineHeight="1.3"
                            mt={10} // Increased margin-top to push title down
                            mb={4}
                          >
                            {recipe.title || 'Untitled Recipe'}
                          </Heading>

                          {/* Buttons pinned to the bottom */}
                          <Box
                            display="flex"
                            flexDirection="column"
                            flex="1"
                            justifyContent="flex-end"
                          >
                            <HStack
                              spacing={2}
                              justify="center"
                              mb={0} // Ensure no extra margin at the bottom
                            >
                              <Button
                                onClick={() => handleViewDetails(recipe.id)}
                                bg="#00A170"
                                color="white"
                                fontSize="xs"
                                px={3}
                                py={1}
                                borderRadius="md"
                                _hover={{ bg: '#008c5e' }}
                                aria-label={`View details for ${recipe.title || 'Untitled Recipe'}`}
                              >
                                View Details
                              </Button>
                              <SimilarRecipes recipeId={recipe.id} />
                            </HStack>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                )}

                {secondRow.length > 0 && (
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {secondRow.map((recipe, index) => (
                      <Box
                        key={index + 4}
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="lg"
                        p={4}
                        display="flex"
                        flexDirection="column"
                        boxShadow="sm"
                        _hover={{ transform: 'scale(1.05)' }}
                        width="100%"
                        height="300px"
                        aspectRatio="1/1"
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          flex="1"
                        >
                          <Heading
                            as="h2"
                            size="sm"
                            color="gray.800"
                            textAlign="center"
                            overflowWrap="break-word"
                            lineHeight="1.3"
                            mt={10}
                            mb={4}
                          >
                            {recipe.title || 'Untitled Recipe'}
                          </Heading>

                          <Box
                            display="flex"
                            flexDirection="column"
                            flex="1"
                            justifyContent="flex-end"
                          >
                            <HStack
                              spacing={2}
                              justify="center"
                              mb={0}
                            >
                              <Button
                                onClick={() => handleViewDetails(recipe.id)}
                                bg="#00A170"
                                color="white"
                                fontSize="xs"
                                px={3}
                                py={1}
                                borderRadius="md"
                                _hover={{ bg: '#008c5e' }}
                                aria-label={`View details for ${recipe.title || 'Untitled Recipe'}`}
                              >
                                View Details
                              </Button>
                              <SimilarRecipes recipeId={recipe.id} />
                            </HStack>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                )}

                {thirdRow.length > 0 && (
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {thirdRow.map((recipe, index) => (
                      <Box
                        key={index + 7}
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="lg"
                        p={4}
                        display="flex"
                        flexDirection="column"
                        boxShadow="sm"
                        _hover={{ transform: 'scale(1.05)' }}
                        width="100%"
                        height="300px"
                        aspectRatio="1/1"
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          flex="1"
                        >
                          <Heading
                            as="h2"
                            size="sm"
                            color="gray.800"
                            textAlign="center"
                            overflowWrap="break-word"
                            lineHeight="1.3"
                            mt={10}
                            mb={4}
                          >
                            {recipe.title || 'Untitled Recipe'}
                          </Heading>

                          <Box
                            display="flex"
                            flexDirection="column"
                            flex="1"
                            justifyContent="flex-end"
                          >
                            <HStack
                              spacing={2}
                              justify="center"
                              mb={0}
                            >
                              <Button
                                onClick={() => handleViewDetails(recipe.id)}
                                bg="#00A170"
                                color="white"
                                fontSize="xs"
                                px={3}
                                py={1}
                                borderRadius="md"
                                _hover={{ bg: '#008c5e' }}
                                aria-label={`View details for ${recipe.title || 'Untitled Recipe'}`}
                              >
                                View Details
                              </Button>
                              <SimilarRecipes recipeId={recipe.id} />
                            </HStack>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            )}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SearchRecipesByIngredients;