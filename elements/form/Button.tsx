import styled, { css } from "styled-components";

type Button = {
  withInput?: boolean;
  href?: string;
  padding?: string;
  background?: string;
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
  background: ${({ background }) => background || '#000'};
  padding: ${({ padding }) => padding || '10px 20px'};
  color: ${({ color }) => color || '#FFF'};
  border-radius: ${({ withInput }) => withInput ? '0 5px 5px 0' : '5px'};
`;

const Link = styled.a`
  ${common};
  text-transform: uppercase;
`;

type ButtonProps = {
  href?: string;
  withInput?: boolean;
  padding?: string;
  background?: string;
  color?: string;
  children?: React.ReactNode;
  onClick?: (e: { preventDefault: () => void; } | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonEl = (props: ButtonProps) => {
  const { href, withInput, children, onClick, padding, background, color } = props;
  if (href) {
    return(
      <Link href={href}>
        {children}
      </Link>
    )
  }
  return (
    <Button
      withInput={withInput}
      onClick={onClick}
      padding={padding}
      background={background}
      color={color}
    >
      {children}
    </Button>
  );
}

export default ButtonEl;
