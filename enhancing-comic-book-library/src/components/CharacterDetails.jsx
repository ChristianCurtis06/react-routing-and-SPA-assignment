// Task 2: Dynamic Routes for Character Details
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = () => {
    const { characterId } = useParams();
    const hash = '37886931d7112b2faba57f9dd855917e';
    const publicKey = '65f6c3c02d551d550b145f091228b25c';
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`;

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!characterId) return;

        fetchCharacter();
    }, [characterId]);

    const fetchCharacter = async () => {
        if (!characterId) return;

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
                                    {character.comics.items.map(comic => (<li key={comic.resourceURI}>{comic.name}</li>))}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default CharacterDetails;