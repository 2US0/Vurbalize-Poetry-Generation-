import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import EmotionOverlay from "./EmotionOverlay";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const DisplayContainer = styled(motion.div)`
  width: 580px; /* Set a fixed width */
  margin: 0px 0px 0px 0px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid #4046f7; /* Add border with color #ff8c00 */
  max-height: 100vh;
  overflow-y: auto; /* Allow vertical scrolling */
  min-height: auto;
  align-self: flex-end;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -5px;
`;

const HeaderText = styled.h2`
  margin: 0px;
`;

const PoemTextContainer = styled.div`
  max-height: 75vh; /* Ensure it doesn't exceed 70% of the viewport height */
  overflow-y: auto; /* Add vertical scrollbar */
  padding-right: 10px; /* Add padding to avoid content hiding behind scrollbar */
`;

const PoemText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap; /* Preserve line breaks and formatting */
`;

const EmotionButton = styled(motion.button)`
  background-color: #faf9f6;
  color: #000000;
  border: none;
  padding: 8px 16px;
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 2px solid #ff8c00;
  margin-right: 20px;
`;

const PlaceholderText = styled.p`
  font-size: 18px;
  color: #777;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const ActionButton = styled(motion.button)`
  background-color: #faf9f6;
  color: #000000;
  border: none;
  border-radius: 7px;
  font-size: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 2px solid #ff8c00;
  width: 40px;
  height: 40px;
`;


const RegenerateButton = styled(motion.button)`
  background-color: #ff8c00;
  color: white;
  padding: 10px 4px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 115px;
`;

const PoemDisplay = ({ poem, emotions }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPrintingDone, setIsPrintingDone] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  useEffect(() => {
    if (!poem) {
      setIsPrintingDone(false);
    }
  }, [poem]);

  const handleEmotionButtonClick = () => {
    setShowOverlay(!showOverlay);
  };

  const fadeInFromBelow = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleSpeak = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
    } else {
      const utterance = new SpeechSynthesisUtterance(poem);
      window.speechSynthesis.speak(utterance);
    }
    setIsReading(!isReading);
  };

  const handleCopy = () => {
    console.log("Copy was clicked");
    navigator.clipboard.writeText(poem);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Generated Poem",
          text: poem,
        });
        console.log("Poem shared successfully");
      } catch (error) {
        console.error("Error sharing poem:", error);
      }
    } else {
      console.log("Web Share API not supported in this browser");
    }
  };
  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
    }
  };
  const onRegenerate = () => {
    window.location.reload();
    console.log("Regenerate button clicked");
  };

  return (
    <MainContainer>
      {showOverlay && (
        <EmotionOverlay
          onClose={handleEmotionButtonClick}
          emotions={emotions}
          style={{
            position: "relative",
            height: "100%",
          }}
        />
      )}
      <DisplayContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderContainer>
          <div>
            <HeaderText>Output:</HeaderText>
          </div>
          {poem && (
            <EmotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmotionButtonClick}
            >
              Emotion Analysis
            </EmotionButton>
          )}
        </HeaderContainer>
        <PoemTextContainer>
          {!poem && (
            <PlaceholderText>
              Generated poem will appear here...
            </PlaceholderText>
          )}
          <PoemText>
            {poem.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.05,
                  delay: index * 0.05,
                  onComplete: () => {
                    if (index === poem.length - 1) {
                      setIsPrintingDone(true);
                    }
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </PoemText>
        </PoemTextContainer>
        {poem && isPrintingDone && (
          <ButtonContainer>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
            >
              <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                <path
                  fill="currentColor"
                  d="M18 9a3 3 0 10-2.977-2.63l-6.94 3.47a3 3 0 100 4.319l6.94 3.47a3 3 0 10.895-1.789l-6.94-3.47a3.03 3.03 0 000-.74l6.94-3.47C16.456 8.68 17.19 9 18 9z"
                />
              </svg>
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpeak}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
              >
                <path d="M8.5 1A4.5 4.5 0 004 5.5v7.047a2.453 2.453 0 004.75.861l.512-1.363a5.553 5.553 0 01.816-1.46l2.008-2.581A4.34 4.34 0 008.66 1H8.5zM3 5.5A5.5 5.5 0 018.5 0h.16a5.34 5.34 0 014.215 8.618l-2.008 2.581a4.555 4.555 0 00-.67 1.197l-.51 1.363A3.453 3.453 0 013 12.547V5.5zM8.5 4A1.5 1.5 0 007 5.5v2.695c.112-.06.223-.123.332-.192.327-.208.577-.44.72-.727a.5.5 0 11.895.448c-.256.513-.673.865-1.079 1.123A8.538 8.538 0 017 9.313V11.5a.5.5 0 01-1 0v-6a2.5 2.5 0 015 0V6a.5.5 0 01-1 0v-.5A1.5 1.5 0 008.5 4z" />
              </svg>
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM382 896h-.2L232 746.2v-.2h150v150z" />
              </svg>
            </ActionButton>
            <RegenerateButton
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRegenerate}
              {...fadeInFromBelow}
            >
              {hovering ? "Try Again" : "Didn't like it?"}
            </RegenerateButton>
          </ButtonContainer>
        )}
      </DisplayContainer>
    </MainContainer>
  );
};

export default PoemDisplay;
