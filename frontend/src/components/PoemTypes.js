import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = styled(motion.div)`
  width: 250px;
  height: 100%;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 85vh;`;

const Title = styled(motion.h2)`
  font-size: 20px;
  margin-bottom: 20px;
`;

const TypeCard = styled(motion.button)`
  background-color: ${props => props.isSelected ? '#fff7e6' : '#fff'};
  border: 1px solid ${props => props.isSelected ? '#ffa940' : '#e0e0e0'};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
  position: relative;
  z-index: ${props => props.isSelected ? 1 : 0};
`;

const TypeTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
`;

const TypeDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const poemTypes = [
  { "title": "Custom", "description": "Choose your own parameters & generate", "isCustom": true },
  { "title": "Acrostic", "description": "A poem where the first letter of each line spells out a word." },
  { "title": "Ballad", "description": "Narrative poem with a melodious rhyme scheme, often in quatrains (ABCB)." },
  { "title": "Elegy", "description": "Reflective poem about death, often ending with hope or redemption." },
  { "title": "Epic", "description": "Long, detailed poem about larger-than-life characters or historical events." },
  { "title": "Free Verse", "description": "Poem with no consistent rhyme scheme or meter, allowing creative freedom." },
  { "title": "Ghazal", "description": "Short poem of couplets with repeated refrains, often about love and loss." },
  { "title": "Haiku", "description": "3 lines, 5-7-5 syllables, nature themes, Japanese origin." },
  { "title": "Limerick", "description": "Humorous five-line poem with an AABBA rhyme scheme." },
  { "title": "Ode", "description": "Poem that praises someone or something, often using a formal tone." },
  { "title": "Sonnet", "description": "14 lines, often about love, with specific rhyme schemes (e.g., ABAB, CDCD)." },
  { "title": "Villanelle", "description": "19-line poem with repeated lines and an ABA rhyme scheme, often about obsession." }
];

const PoemTypes = ({ onTypeChange }) => {
  const customIndex = poemTypes.findIndex(type => type.title === "Custom");
  const [selectedType, setSelectedType] = useState(customIndex);

  const handleTypeClick = (index) => {
    setSelectedType(index);
    onTypeChange(poemTypes[index]);
  };

  return (
    <Sidebar
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Types of Poem
      </Title>
      <AnimatePresence>
        {poemTypes.map((type, index) => (
          <TypeCard
            key={index}
            isCustom={type.isCustom}
            isSelected={selectedType === index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, scale: selectedType === index ? 1.05 : 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleTypeClick(index)}
          >
            <TypeTitle>{type.title}</TypeTitle>
            <TypeDescription>{type.description}</TypeDescription>
          </TypeCard>
        ))}
      </AnimatePresence>
    </Sidebar>
  );
};

export default PoemTypes;