import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import PoemTypes from "./PoemTypes";
import BouncingDotsLoader from "./BouncingDotsLoader";

const socket = io("https://vurbalize-poetry-generation.onrender.com");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 0px 0px 0px 0px;
`;

const MainContent = styled.div`
  flex: 2;
  padding: 20px;
`;

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
`;

const PromptInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PromptInput = styled(motion.input)`
  padding: 10px 40px 10px 10px; /* Adjust padding to make space for the arrow */
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
`;

const OptionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column; /* Ensure each OptionGroup is on a new line */
  gap: 15px;
  margin-bottom: 15px;
`;

const OptionGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const OptionLabel = styled(motion.label)`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OptionButton = styled(motion.button)`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: ${(props) => (props.selected ? "#ff8c00" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  cursor: pointer;
`;

const SeeAllToggle = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: #007bff;
  margin-top: 10px;
`;

const CreativitySliderWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CreativitySlider = styled(motion.input)`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: linear-gradient(
    to right,
    #ff8c00 ${(props) => props.value}%,
    #ddd ${(props) => props.value}%
  );
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: white;
    border: 2px solid #ff8c00;
    border-radius: 50%;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: white;
    border: 2px solid #ff8c00;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SliderTooltip = styled.div`
  position: absolute;
  top: -30px;
  left: ${(props) => props.value}%;
  transform: translateX(-50%);
  background-color: #ff8c00;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const GenerateButton = styled(motion.button)`
  background-color: #ff8c00;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
`;

const LanguageSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  margin-bottom: 15px;
  width: 40%;
  box-sizing: border-box;
`;

export const PoemInput = ({ onReceiveData }) => {
  const [prompt, setPrompt] = useState("");
  const [genText, setGenText] = useState("Try your luck");
  const [language, setLanguage] = useState("English");
  const [poemLength, setPoemLength] = useState("Medium");
  const [rhymeScheme, setRhymeScheme] = useState("ABAB");
  const [creativity, setCreativity] = useState(42);
  const [wordsPerLine, setWordsPerLine] = useState(5);
  const [showAllSchemes, setShowAllSchemes] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [selectedType, setSelectedType] = useState("Custom");
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ];
  const rhymeSchemes = [
    "AABB",
    "ABAB",
    "ABCB",
    "ABBA",
    "ABABBCBC",
    "ABA",
    "AABBA",
    "AAAA",
    "ABAABA",
  ];

  const fadeInFromBelow = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };
  const handleTypeChange = (type) => {
    setSelectedType(type.title);
    console.log("Selected type:", type);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    socket.on("poem_response", (data) => {
      onReceiveData(data);
      setIsLoading(false);
    });
    return () => socket.off("poem_response");
  }, [ onReceiveData]);

  useEffect(() => {
    if (prompt.length >= 1) {
      setGenText("Generate Poem");
    } else {
      setGenText("Try your luck");
    }
  }, [prompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    socket.emit("generate_poem", {
      selectedType,
      prompt,
      language,
      poemLength,
      rhymeScheme,
      creativity,
      wordsPerLine,
    });
    console.log(
      JSON.stringify({
        selectedType,
        prompt,
        language,
        poemLength,
        rhymeScheme,
        creativity,
        wordsPerLine,
      })
    );
  };

  return (
    <Container>
      <Sidebar>
        <PoemTypes onTypeChange={handleTypeChange} />
      </Sidebar>
      <MainContent>
        <InputContainer {...fadeInFromBelow}>
          <PromptInputWrapper>
            <PromptInput
              type="text"
              placeholder="Generate a poem on"
              value={prompt}
              onChange={handlePromptChange}
              {...fadeInFromBelow}
            />
          </PromptInputWrapper>
          <OptionsContainer {...fadeInFromBelow}>
            <OptionGroup {...fadeInFromBelow}>
              <OptionLabel>Language</OptionLabel>
              <LanguageSelect value={language} onChange={handleLanguageChange}>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </LanguageSelect>
            </OptionGroup>
            <OptionGroup {...fadeInFromBelow}>
              <OptionLabel>Poem length</OptionLabel>
              <ButtonGroup>
                {["Short", "Medium", "Long"].map((length) => (
                  <OptionButton
                    key={length}
                    selected={poemLength === length}
                    onClick={() => setPoemLength(length)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {length}
                  </OptionButton>
                ))}
              </ButtonGroup>
            </OptionGroup>
            <OptionGroup {...fadeInFromBelow}>
              <OptionLabel>Rhyme scheme</OptionLabel>
              <ButtonGroup>
                {(showAllSchemes ? rhymeSchemes : rhymeSchemes.slice(0, 4)).map(
                  (scheme) => (
                    <OptionButton
                      key={scheme}
                      selected={rhymeScheme === scheme}
                      onClick={() => setRhymeScheme(scheme)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {scheme}
                    </OptionButton>
                  )
                )}
              </ButtonGroup>
              <SeeAllToggle onClick={() => setShowAllSchemes(!showAllSchemes)}>
                {showAllSchemes ? "See less" : "See all"}
              </SeeAllToggle>
            </OptionGroup>
            <OptionGroup {...fadeInFromBelow}>
              <OptionLabel>Words per line</OptionLabel>
              <ButtonGroup>
                {[5, 10, 15, 20].map((words) => (
                  <OptionButton
                    key={words}
                    selected={wordsPerLine === words}
                    onClick={() => setWordsPerLine(words)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {words} words
                  </OptionButton>
                ))}
              </ButtonGroup>
            </OptionGroup>
            <OptionGroup {...fadeInFromBelow}>
              <OptionLabel>Creativity level</OptionLabel>
              <CreativitySliderWrapper>
                <CreativitySlider
                  type="range"
                  min="0"
                  max="100"
                  value={creativity}
                  onChange={(e) => setCreativity(e.target.value)}
                  onMouseDown={() => setIsAdjusting(true)}
                  onMouseUp={() => setIsAdjusting(false)}
                  onTouchStart={() => setIsAdjusting(true)}
                  onTouchEnd={() => setIsAdjusting(false)}
                />
                <SliderTooltip value={creativity} show={isAdjusting}>
                  {creativity}
                </SliderTooltip>
              </CreativitySliderWrapper>
            </OptionGroup>
          </OptionsContainer>
          <GenerateButton
            onClick={handleSubmit}
            {...fadeInFromBelow}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
          >
            {genText}
          </GenerateButton>
          {isLoading && <BouncingDotsLoader />}
        </InputContainer>
      </MainContent>
    </Container>
  );
};

export default PoemInput;
