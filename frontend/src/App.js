import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Navbar from './components/Navbar';
import PoemInput from './components/PoemInput';
import PoemDisplay from './components/PoemDisplay';

const socket = io('https://vurbalize-poetry-generation.onrender.com');

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const PoemGenerator = styled.div`
  display: flex;
  flex-direction: row; 
  flex: 1;
  padding: 10px 0px 0px 0px;
  gap: 5px; 
`;

const Pane = styled.div`
  &:first-child {
    flex: 3; /* PoemInput takes 3/5th of the space */
  }
  &:last-child {
    flex: 2; /* PoemDisplay takes 2/5th of the space */
  }
`;

const App = () => {
  const [poem, setPoem] = useState('');
  const [emotions, setEmotions] = useState({});

  useEffect(() => {
    socket.on('poem_response', (data) => {
      handleReceiveData(data);
    });

    return () => {
      socket.off('poem_response');
    };
  }, []);

  const handleReceiveData = (data) => {
    console.log('Poem received:', data);
    if (data && data.poem && data.emotions) {
      setPoem(data.poem);
      setEmotions(data.emotions);
    }
  };


  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <PoemGenerator>
          <Pane>
            <PoemInput 
              socket={socket} 
              onReceiveData={handleReceiveData} 
              selectedPoemType
            />
          </Pane>
          <Pane>
            <PoemDisplay poem={poem} emotions={emotions} />
          </Pane>
        </PoemGenerator>
      </MainContent>
    </AppContainer>
  );
};

export default App;