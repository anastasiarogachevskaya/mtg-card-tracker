import React from 'react';
import { providers, signIn, getSession, useSession, csrfToken } from "next-auth/client";
import styled from 'styled-components';
import { FaTwitter, FaRedditAlien, FaGithub } from 'react-icons/fa';

import InputField  from '../elements/form/InputField';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto 0 auto;
  background: ${({ theme }) => theme.componentContainerBGColor};
  padding: 2em;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 20px -10px ${({ theme }) => theme.boxShadowColor};;
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
  background: ${({ theme }) => theme.primary.underBgColor};
  border: 2px solid #121212;
  border-radius: 50%;
  color: ${({ theme }) => theme.primary.textColor};
  display: inline-block;
  font-size: 1.2rem;
  height: 38px;
  width: 38px;
  padding: 7px 0;
  transition: all .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #FFF;
  }
`;
const Text = styled.div`
  margin: 2em 0;
`;
const Form = styled.form``;
const Button = styled.button`
  background-color: #000;
  border: 2px solid #000;
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
    color: #000;
  }
`;

const StyledInput = styled(InputField)`
  display: inline-block;
  max-width: 250px;
  margin: 0 auto;
  border-radius: 5px 0 0 5px;
`;



export default function SignIn({providers, csrfToken}) {
  const [session, loading] = useSession();
  return (
    <Container>
      <Title>Create account</Title>

      <Box>
        {providers && Object.values(providers).map((provider) => {
          if(provider.name === 'Email') { return }
          return(
            <Provider key={provider.name}>
              <IconWrapper onClick={()=> signIn(provider.id)}>
                {provider.name === 'Reddit' && <FaRedditAlien />}
                {provider.name === 'GitHub' && <FaGithub />}
                {provider.name === 'Twitter' && <FaTwitter />}
              </IconWrapper>
            </Provider>
          )
        })}
      </Box>
      <Text>or use your email</Text> 
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

  if (session) {
    console.log('redirecting to /');
    res.writeHead(302, {
      Location: "/user/profile",
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
