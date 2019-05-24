import styled from 'styled-components';

export default styled.ul`
  padding: 1.4rem;
  list-style-type: ${({ noBullets }) => (noBullets ? 'none' : 'disc')};
`;
