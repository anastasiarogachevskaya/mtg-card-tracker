import React from 'react';
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import styled from 'styled-components';
import { FaTwitter, FaFacebookF, FiGithub, FaGithub } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';

import InputField  from '../elements/form/InputField';

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
const Provider = styled.div`
  display: inline-block;
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;
const IconWrapper = styled.button`
  background-color: #FFF;
  border: 2px solid #1A2E35;
  border-radius: 50%;
  color: #1A2E35;
  display: inline-block;
  font-size: 1.2rem;
  height: 38px;
  width: 38px;
  padding: 7px 0;
  transition: all .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: #1A2E35;
    color: #FFF;
  }
`;
const Text = styled.div`
  margin: 2em 0;
`;
const Form = styled.form``;
const Button = styled.button`
  background-color: #1A2E35;
  border: 2px solid #1A2E35;
  border-radius: 0 5px 5px 0;
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
  display: inline-block;
  max-width: 250px;
  margin: 0 auto;
  border-radius: 5px 0 0 5px;
`;



export default function SignIn({providers, csrfToken}) {
  return (
    <Container>
      <Title>Create account</Title>

      <Box>
        {Object.values(providers).map((provider) => {
          if(provider.name === 'Email') { return }
          return(
            <Provider key={provider.name}>
              <IconWrapper onClick={()=> signIn(provider.id)}>
                {provider.name === 'Google' && <AiOutlineGoogle />}
                {provider.name === 'GitHub' && <FaGithub />}
                {provider.name === 'Facebook' && <FaFacebookF />}
                {provider.name === 'Twitter' && <FaTwitter />}
              </IconWrapper>
            </Provider>
          )
        })}
      </Box>
      <Text>or user your email registration</Text> 
      <Box>
        <Form method="post" action='/api/auth/signin/email' >
          <InputField name="csrfToken" type="hidden"  defaultValue={csrfToken} />
          <StyledInput type="email" name="email" id="email" placeholder="Email"/>
          <Button type="submit">Sign In</Button>
        </Form>
      </Box>
    </Container>
  )
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};
