import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import pokeballImage from '../../assets/pokeball.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './Pokemon.css';

interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  type: string;
  description: string;
  height: number;
  weight: number;
}

const PokemonPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
        );

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`,
        );
        const description = speciesResponse.data.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en',
        ).flavor_text;
        setPokemonData({
          id: response.data.id,
          name: response.data.name,
          sprite: response.data.sprites.front_default,
          type: response.data.types[0].type.name,
          description: description,
          height: response.data.height,
          weight: response.data.weight,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [name]);

  if (!pokemonData) {
    return <LoadingImage />;
  }

  const handleChangePokemon = async (iterator: number) => {
    console.log('iterator', iterator);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonData.id + iterator}`,
      );
      navigate(`/pokemon/${response.data.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout>
      <StyledIcon
        onClick={() => handleChangePokemon(-1)}
        icon={faChevronLeft}
        className={pokemonData && pokemonData.id === 1 ? 'disabled' : ''}
      />
      <PokemonContainer>
        <PokemonName>
          {pokemonData.name} #{pokemonData.id}
        </PokemonName>
        <div className="pokemon-info">
          <PokemonImage>
            <Image
              src={pokemonData.sprite}
              alt={`${pokemonData.name} sprite`}
            />
          </PokemonImage>
          <div>
            <PokemonDescription>{pokemonData.description}</PokemonDescription>
            <PokemonStats className="pokemon-stats">
              <div>
                <PokemonInfoTitle>Type</PokemonInfoTitle>
                <PokemonType className={`type-icon type-${pokemonData.type}`}>
                  {pokemonData.type}
                </PokemonType>
              </div>
              <div>
                <div>
                  <PokemonInfoTitle>Height</PokemonInfoTitle>
                  <span>{pokemonData.height}m</span>
                </div>
                <div>
                  <PokemonInfoTitle>Weight</PokemonInfoTitle>
                  <span>{pokemonData.weight}kg</span>
                </div>
              </div>
            </PokemonStats>
          </div>
        </div>
      </PokemonContainer>
      <StyledIcon
        onClick={() => handleChangePokemon(1)}
        icon={faChevronRight}
        className={pokemonData && pokemonData.id === 1118 ? 'disabled' : ''}
      />
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 370px;
  position: relative;
  margin: 100px auto;
  border: 1px solid;
  border-radius: 6px;
  padding-bottom: 2rem;
  text-align: center;
`;

const PokemonImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokemonStats = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PokemonName = styled.h1`
  text-transform: capitalize;
`;

const PokemonDescription = styled.p`
  grid-column: 3 / span 2;
  grid-row: 1 / span 2;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const PokemonInfoTitle = styled.h3`
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 0 0 0.2rem;
`;

const PokemonType = styled.p`
  display: inline-block;
  width: 54px;
  line-height: 1;
  margin: 1px 0;
  padding: 3px 0;
  font-family: 'Fira Sans', sans-serif;
  border: 1px solid #aaa;
  border-radius: 2px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  text-shadow: 1px 1px 1px #333;
  text-transform: uppercase;
`;

const roll = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingImage = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${pokeballImage});
  background-repeat: no-repeat;
  background-size: cover;
  animation: ${roll} 1s linear infinite;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 2em;
  cursor: pointer;

  &:hover {
    color: #888;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export default PokemonPage;
