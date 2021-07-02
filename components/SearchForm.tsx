import React, { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import styled from 'styled-components';
import Button from '../elements/form/Button';
import InputField from '../elements/form/InputField';

const Form = styled.form`
  display: flex;
`;

const SearchForm = ({ onSearch }:any) => {
  const [searchString, setSearchString] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchString);
  }

  return (
    <Form onSubmit={onSubmit}>
      <InputField 
        id="searchField"
        type="text"
        onChange={onChange}
        placeholder="Search..."
        withButton
      />
      <Button withInput><RiSearch2Line /></Button>
    </Form>
  );
};

export default SearchForm;