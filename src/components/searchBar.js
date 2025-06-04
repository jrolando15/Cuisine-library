// searchBar.js
import React from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'; // 1. Import the icon
import './searchBar.css';

const SearchBar = ({ placeholder, value, onChange, onSearch, disabled, ...props }) => {
  // Handler for Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      onSearch(); // Trigger search when Enter is pressed with text
    }
  };

  return (
    <Flex className="search-bar" justify="center" align="center" my={12}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown} // Add Enter key event listener
        width="200px"
        p={2}
        fontSize="md"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        mr={2}
        _focus={{ borderColor: '#00A170', boxShadow: 'none' }}
        {...props}
      />
      <Button
        onClick={onSearch}
        isDisabled={disabled}
        bg="#00A170"
        color="white"
        p={2}
        px={4}
        fontSize="md"
        borderRadius="md"
        _hover={{ bg: '#008c5e', transform: 'scale(1.05)' }}
        _disabled={{
          bg: '#A0AEC0',
          color: 'gray.600',
          cursor: 'not-allowed',
          transform: 'none'
        }}
        aria-label="Search"
      >
        <SearchIcon boxSize={5} /> {/* 2. Use the icon here */}
      </Button>
    </Flex>
  );
};

export default SearchBar;

