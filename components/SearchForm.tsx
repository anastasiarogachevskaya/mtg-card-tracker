import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import useDebounce from '../hooks/useDebounce';
import { RiSearch2Line } from 'react-icons/ri';
import styled from 'styled-components';
import Button from '../elements/form/Button';
import InputField from '../elements/form/InputField';

const Form = styled.form`
  width: 100%;
  flex: 2;
`;

const Flex = styled.div`
  display: flex;
`;

const List = styled.ul`
  list-style: none;
  padding: .95em 0;
  border-radius: 0 0 5px 5px;
  margin: -5px 0 0 0;
  background: #fff;
  box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 8%);
  color: #666;
  font-size: 16px;
  width: calc(100% - 210px);
  position: absolute;
  top: 70px;
  z-index: 100;
`;

const ListItem = styled.li`
  line-height: 1.5;
  padding: 1px 1em;
  cursor: pointer;
  background: transparent;
  transition: all .1s ease-in-out;
  &:hover {
    background: #f0f0f0;
  }
`;

const SearchForm = ({ onSearch }:any) => {
  const [searchString, setSearchString] = useState<string>('');
  const [suggestions, setSuggestions] = useState([]);
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef<any>(null);

  const debounceInput = useDebounce((newText: React.SetStateAction<string>) => { setSearchString(newText) }, 300);

  useEffect(() => {
    setDisplay(true);
    if (searchString.length > 2) {
      const response = axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/search/autocomplete?q=${searchString}`);
      response.then(({ data }) => {
        setSuggestions(data);
      });
    }
  }, [searchString]);

  const onSuggestionClick = (text: string) => {
    setSuggestions([]);
    setDisplay(false);
    onSearch(searchString);
  };
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchString('');
    setSuggestions([]);
    onSearch(searchString);
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event: { target: any; }) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <Form ref={wrapperRef} onSubmit={onSubmit}>
      <Flex>
        <InputField
          id="searchField"
          type="search"
          onClick={() => setDisplay(true)}
          onChange={event => debounceInput(event.target.value) }
          placeholder="Search..."
          withButton
          autoComplete="off"
        />
        {display && suggestions.length > 0 && 
          <List>
          {suggestions.map((suggestion, index) => <ListItem key={`${suggestion}.${index}`} onClick={() => onSuggestionClick(suggestion)}>{suggestion}</ListItem> )}
          </List>
        }
        <Button withInput><RiSearch2Line /></Button>
      </Flex>
    </Form>
  );
};

export default SearchForm;