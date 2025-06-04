import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeInformation } from '../../services/apiService';
import { Box, Heading, Image, Text, List, ListItem, Button, VStack, Grid, GridItem, Center } from '@chakra-ui/react';
import './RecipeInformation.css';

const RecipeInformation = () => {
  const { recipeId } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeInformation = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipeInformation(recipeId);
        setRecipeInfo(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeInformation();
  }, [recipeId]);

  if (loading) return <Text fontSize="md" textAlign="center">Loading...</Text>;
  if (error) return <Text color="red.500" fontSize="md" textAlign="center">Error: {error}</Text>;

  return (
    <Box className="page-container" minH="100vh" pt={10}>
      {/* Recipe Information Container */}
      <Box 
        className="recipe-information-container"
        bg="rgba(255,255,255,0.9)"
        borderRadius="lg"
        boxShadow="md"
        p={5}
        mb={5}
        maxW="1200px"
        mx="auto"
        w="90%"
      >
        {recipeInfo ? (
          <VStack spacing={6} align="stretch">
            {/* Title at the top */}
            <Heading as="h3" size="lg" color="gray.800" textAlign="center">
              {recipeInfo.title}
            </Heading>
            
            {/* Image on the left, Ingredients on the right */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <GridItem>
                <Image
                  src={recipeInfo.image}
                  alt={recipeInfo.title}
                  borderRadius="md"
                  width="100%"
                  objectFit="cover"
                />
              </GridItem>
              <GridItem>
                <Box>
                  <Heading as="h5" size="md" color="gray.800" mb={3}>
                    Ingredients:
                  </Heading>
                  <List spacing={2} pl={5}>
                    {recipeInfo.extendedIngredients?.map((ingredient, index) => (
                      <ListItem key={index} fontSize="md" color="gray.700">
                        {ingredient.original}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </GridItem>
            </Grid>
            
            {/* Centered Instructions heading */}
            <Center mt={6}>
              <Heading as="h5" size="md" color="gray.800">
                Instructions:
              </Heading>
            </Center>
            
            {/* Summary text below the centered heading */}
            <Text
              fontSize="md"
              color="gray.700"
              textAlign="justify"
              width="100%"
              dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}
            />
            
            {/* Back to Search button moved to bottom of container */}
            <Center mt={8} mb={2}>
              <Button
                bg="#00A170"
                color="white"
                fontSize="md"
                px={5}
                py={2}
                borderRadius="md"
                _hover={{ bg: '#dbcdb5', color: 'gray.800', transform: 'scale(1.05)' }}
                onClick={() => navigate('/search', { state: { resetSearchBar: true } })}
              >
                Back to Search
              </Button>
            </Center>
          </VStack>
        ) : (
          <Text fontSize="md" textAlign="center">No recipe information available.</Text>
        )}
      </Box>
    </Box>
  );
};

export default RecipeInformation;



