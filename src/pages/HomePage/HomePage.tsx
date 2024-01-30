import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import pokemonLogo from '../../assets/pokemon_logo.png';
import Typeahead from '../../components/TypeAhead/TypeAhead.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 400px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const input = event.currentTarget.value;
      navigate(`/pokemon/${input}`);
    }
  };
  return (
    <Container>
      <Logo src={pokemonLogo} alt="Pokemon Logo" />
      <Typeahead onKeyDown={handleKeyDown}></Typeahead>
    </Container>
  );
};

export default HomePage;
