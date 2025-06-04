import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Heading, Text, VStack, Button, Center } from '@chakra-ui/react';
import RecipeSearch from './components/Templates/RecipeSearch';
import SearchRecipesByIngredients from './components/Templates/searchRecipesByIngredients';
import RandomRecipes from './components/Templates/getRandomRecipes';
import RecipeInformation from './components/Templates/RecipeInformation';
import Layout from './layout/layout';
import './App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Center minH="100vh" w="100vw">
      <VStack className="home-container" spacing={8} align="center" justify="center" w="100%">
        <Box
          bg="rgba(255, 255, 255, 0.85)"
          borderRadius="lg"
          boxShadow="md"
          px={6}
          py={4}
          textAlign="center"
        >
          <Heading as="h2" size="2xl" color="#000000">
            Welcome to the Cuisine Library
          </Heading>
        </Box>
        <Box
          className="home-description"
          textAlign="justify"
          maxW="600px"
          px={4}
          py={4}
          bg="rgba(255, 255, 255, 0.85)"
          borderRadius="lg"
          boxShadow="md"
        >
          <Text fontSize="lg" lineHeight="1.6" color="#333333">
            Discover a world of delicious possibilities in your own kitchen. Our recipe app is here to help you cook up a storm with easy to follow recipes, helpful tips, and inspiration for every meal. Whether you're cooking for yourself or your loved ones, you'll find something to delight everyone. From simple weeknight dinners to special occasion meals, we'll help you turn your kitchen into a place where memories are made and flavors come alive. Your next favorite dish is just a tap away.
          </Text>
        </Box>
        <Button
          bg="#00A170"
          color="white"
          _hover={{ bg: "#00875a" }}
          size="lg"
          onClick={() => navigate('/search')}
        >
          Explore recipes
        </Button>
      </VStack>
    </Center>
  );
};

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<RecipeSearch />} />
              <Route path="/ingredients" element={<SearchRecipesByIngredients />} />
              <Route path="/random" element={<RandomRecipes number={5} />} />
              <Route path="/recipe-details/:recipeId" element={<RecipeInformation />} />
            </Routes>
          </Layout>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;