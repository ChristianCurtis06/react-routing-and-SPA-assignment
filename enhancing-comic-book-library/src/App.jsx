import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Comics from './components/Comics';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
import NotFound from './components/NotFound';
import './CharacterStyles.css';

const App = () => {
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    const handleCharacterSelected = (characterId) => {
        setSelectedCharacterId(characterId);
    };

    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/browse-characters' element={<BrowseCharacters />} />
                <Route path='/character-details/:characterId' element={<CharacterDetails />} />
                <Route path='/comics' element={<Comics />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;