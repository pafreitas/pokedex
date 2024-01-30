import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  margin-top: 1rem;
  padding: 0.5rem 1.875rem 0.5rem 0.5rem;
  font-size: 1rem;
  background-color: transparent;
  position: relative;
  z-index: 2;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const GhostInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
  color: #aaa;
  z-index: 1;
  border: 'none';
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  z-index: 1;
`;

interface TypeaheadProps {
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ onKeyDown }) => {
  const [input, setInput] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=1118')
      .then((response) => {
        setNames(
          response.data.results.map(
            (pokemon: { name: string }) => pokemon.name,
          ),
        );
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filteredNames = names.filter((name) => name.startsWith(input));
    setPlaceholder(filteredNames[0] || '');
  }, [input, names]);

  const handleKeyDownInternal = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setInput(placeholder);
      return;
    }
    !!onKeyDown && onKeyDown(event as React.KeyboardEvent<HTMLInputElement>);
  };

  return (
    <InputWrapper>
      <SearchIcon icon={faSearch} />
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDownInternal}
      />
      {input.length > 0 && (
        <GhostInput type="text" value={placeholder} disabled />
      )}
    </InputWrapper>
  );
};

export default Typeahead;
