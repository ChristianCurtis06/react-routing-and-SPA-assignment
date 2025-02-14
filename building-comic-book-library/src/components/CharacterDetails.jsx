import { useEffect, useState } from 'react';
import { number } from 'prop-types';
import axios from 'axios';

const CharacterDetails = ({ selectedCharacterId }) => {
    const hash = '37886931d7112b2faba57f9dd855917e';
    const publicKey = '65f6c3c02d551d550b145f091228b25c';
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${selectedCharacterId}?ts=1&apikey=${publicKey}&hash=${hash}`;

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedCharacterId) return;

        fetchCharacter();
    }, [selectedCharacterId]);

    const fetchCharacter = async () => {
        if (!selectedCharacterId) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(apiUrl);
            setCharacter(response.data.data.results[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching character details:', error)
            setError(error.toString());
            setLoading(false);
        }
    };

    if (loading) return <p className='alert-text'>Loading character details...</p>;
    if (error) return <p className='alert-text'>Error fetching character details: {error}</p>;

    return (
        <div>
            {character &&
                <div className='character-details'>
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={`Image of ${character.name}`} />
                    <div className='character-info'>
                        <h2>{character.name}</h2>
                        {character.description && 
                            <p>{character.description}</p>
                        }
                        {character.comics.items &&
                            <div className='character-comics'>
                                <h3>Comics:</h3>
                                <ul>
                                    {character.comics.items.map(comic => (<li>{comic.name}</li>))}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

CharacterDetails.propTypes = {
    selectedCharacterId: number
}

export default CharacterDetails;