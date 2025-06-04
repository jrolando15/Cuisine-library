import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Button, Spinner, VStack, Text } from '@chakra-ui/react';
import { getSimilarRecipes } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const SimilarRecipes = ({ recipeId }) => {
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const modalBodyRef = useRef(null);

  const fetchSimilarRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSimilarRecipes(recipeId, 8);
      setSimilarRecipes(data);
    } catch (err) {
      setError('Failed to load similar recipes');
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    if (isOpen && similarRecipes.length === 0 && !loading && !error) {
      fetchSimilarRecipes();
    }
    if (isOpen && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0; // Reset scroll to top on open
    }
  }, [isOpen, similarRecipes, loading, error, fetchSimilarRecipes]);

  const handleRecipeClick = (id) => {
    navigate(`/recipe-details/${id}`);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} bg="#00A170" color="white" fontSize="sm" px={4} py={2} borderRadius="md" _hover={{ bg: '#008c5e', transform: 'scale(1.05)' }}>
        Similar Recipes
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" initialFocusRef={null}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" color="#000000" fontSize="lg">
            Similar Recipes
          </ModalHeader>
          <ModalCloseButton color="black" _hover={{ bg: 'gray.200' }} />
          <ModalBody maxH="500px" overflowY="auto" p={4} ref={modalBodyRef}>
            {loading && <Spinner />}
            {error && <div>{error}</div>}
            {!loading && !error && similarRecipes.length === 0 && <div>No similar recipes found</div>}
            {!loading && !error && (
              <VStack spacing={4} align="stretch">
                {similarRecipes.map((recipe) => (
                  <Button
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe.id)}
                    w="100%"
                    textAlign="left"
                    py={3}
                    px={4}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
                    transition="all 0.2s"
                  >
                    <Text color="#333333" fontSize="md">
                      {recipe.title}
                    </Text>
                  </Button>
                ))}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SimilarRecipes;







