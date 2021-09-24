import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import InputField  from '../elements/form/InputField';
import Alert from '../elements/Alert';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto 0 auto;
  background-color: #FFFFFF;
  padding: 2em;
  border-radius: 15px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 .5em;
`;
const Box = styled.div`
  margin-top: 2em;
`;

const Text = styled.div`
  margin: 2em 0;
`;
const Form = styled.form``;
const Button = styled.button`
  background-color: #1A2E35;
  border: 2px solid #1A2E35;
  border-radius: 5px;
  color: #FFF;
  cursor: pointer;
  display: inline-block;
  font-size: 0.9rem;
  margin: 0 auto;
  line-height: 1;
  padding: 16px 20px;
  transition: all .2s ease-in;
  text-transform: uppercase;
  vertical-align: bottom;
  &:hover {
    background-color: #FFF;
    color: #1A2E35;
  }
`;

const StyledInput = styled(InputField)`
  display: block;
  max-width: 250px;
  margin: 1em auto;
  border-radius: 5px;
`;

export default function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    //Getting value from useRef()
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //Validation
    if (!email || !email.includes('@') || !password) {
      alert('Invalid details');
      return;
    }
    //POST form values
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    setMessage(data.message);
    setType(data.type);
  };
  return (
    <Container>
      <Title>Create account</Title>
      <Box>
        {message && <Alert type={type} center width={250}>{message}</Alert> }
        <Form method="post" onSubmit={onFormSubmit} >
          <InputField name="csrfToken" type="hidden" />
          <StyledInput type="email" name="email" id="email" placeholder="Email" ref={emailRef} />
          <StyledInput type="password" name="password" id="password" placeholder="Password" ref={passwordRef} />
          <Button type="submit">Sign Up</Button>
        </Form>
      </Box>
    </Container>
  )
}

