import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const OverlayContainer = styled(motion.div)`
  width: 220px;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  border-radius: 15px; 
  border: 2px solid #6c3bf5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-right: 5px;
`;

const OverlayContent = styled.div`
  width: 100%;
  font-family: "Arial", sans-serif;
  background-color: transparent;
  position: relative;
`;

const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0; /* Remove any additional margin */
`;

const Heading = styled.h2`
  margin: 0; /* Remove the margin from the h2 element */
`;

const CloseButton = styled.button`
  background: none;
  color: #333;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const EmotionList = styled(motion.div)`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const EmotionData = styled.div`
  width: 100%;
  margin-top: 15px;
  text-align: center;
`;

const EmotionItem = styled(motion.li)`
  list-style-type: none;
  margin: 8px 0;
  font-size: 1em;
  text-align: left;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid #f0f0f0;
  word-wrap: break-word;
  box-sizing: border-box;
  text-transform: capitalize;
`;

const ChartWrapper = styled.div`
  width: 240px;
  height: 240px;
  margin: 0 auto;
`;

const EmotionOverlay = ({ onClose, emotions }) => {
  const emotionLabels = Object.keys(emotions);
  const emotionValues = Object.values(emotions).map((value) =>
    (value * 100).toFixed(2)
  );

  const data = {
    labels: emotionLabels,
    datasets: [
      {
        label: "Emotion Distribution",
        data: emotionValues,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'black',
        },
      },
    },
  };

  return (
    <OverlayContainer
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.25 }}
    >
      <OverlayContent>
        <HeadingContainer>
          <Heading>Emotion Analysis</Heading>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </HeadingContainer>
        {Object.keys(emotions).length > 0 && (
          <EmotionList
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ChartWrapper>
              <Doughnut data={data} options={options} />
            </ChartWrapper>
            <EmotionData>
              <h3>Detected Emotions:</h3>
              <ul style={{ padding: 0 }}>
                {Object.entries(emotions).map(([emotion, value]) => (
                  <EmotionItem
                    key={emotion}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.05 * Object.keys(emotions).indexOf(emotion),
                    }}
                  >
                    <span>{emotion}</span>
                    <span>{(value).toFixed(2)}%</span>
                  </EmotionItem>
                ))}
              </ul>
            </EmotionData>
          </EmotionList>
        )}
      </OverlayContent>
    </OverlayContainer>
  );
};

export default EmotionOverlay;