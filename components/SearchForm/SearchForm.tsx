import React, { useState } from 'react';
import InputField from '../../elements/form/InputField';


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
    <form onSubmit={onSubmit}>
      <InputField id="searchField" type="text" onChange={onChange} placeholder="Search..." />
    </form>
  );
};

export default SearchForm;