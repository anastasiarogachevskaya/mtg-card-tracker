import styled, { css } from "styled-components";

type Button = {
  withInput?: boolean;
  href?: string;
}

const common = css`
  background: #000;
  color: #FFF;
  border: 0;
  padding: 10px 20px;
  cursor: pointer;
  transition: all .3s ease;
  border: 1px solid #000;

  &:hover {
    background: #FFF;
    color: #000;
  }
`;


const Button = styled.button<Button>`
  ${common};
  border-radius: ${({ withInput }) => withInput ? '0 5px 5px 0' : '5px'};
`;

const Link = styled.a`
  ${common};
  text-transform: uppercase;
`;

const ButtonEl = (props) => {
  const { href, withInput, children } = props;
  if (href) {
    return(
      <Link href={href}>
        {children}
      </Link>
    )
  }
  return (
    <Button withInput={withInput}>
      {children}
    </Button>
  );
}

export default ButtonEl;
