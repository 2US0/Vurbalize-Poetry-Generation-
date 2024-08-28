# Real-time AI Poetry Generation with Emotion Visualization

## Project Overview

This project is a web application that allows users to generate poems using a large language model (LLM) and analyze the emotions within those poems. The app provides an intuitive user interface where users can input a prompt for the poem. The poem is generated in real-time, and the emotions detected in the poem are visualized with dynamic animations. The frontend is built with ReactJS and deployed on Vercel, while the backend is powered by Python/Flask and deployed on Render.

## Features

- **User Prompt Input**: An input field for users to provide prompts for generating poems.
- **Real-time Poem Generation**: The application streams the poem generation process in real-time, showing the poem as it is being created, token by token.
- **Emotion Analysis**: After the poem is generated, it undergoes emotion analysis, identifying emotions like joy, sadness, anger, and more.
- **Dynamic Emotion Visualization**: The detected emotions are visualized using dynamic graphics, providing an engaging user experience.
- **Preset Poem Types**: Users can choose from different poem types, such as sonnets, haikus, and ballads, which predefine certain parameters like rhyme schemes and line lengths.
- **Random Poem Generation**: If no prompt is provided, the application generates a random poem based on the selected poem type and parameters.

## Tech Stack

- **Frontend**: ReactJS, CSS for styling, animations using React Spring
  - Deployed on [Vercel](https://vercel.com/)
- **Backend**: Python/Flask for server-side logic, integration with LLM for poem generation, emotion analysis
  - Deployed on [Render](https://render.com/)
- **Machine Learning**: Integration with an LLM (Gemini) for real-time poem generation and emotion analysis
- **Version Control**: GitHub for source code management
- **Deployment**: Vercel (frontend) and Render (backend)

## Getting Started

### Prerequisites

- Node.js and npm installed on your system
- Python (version 3.7 or higher)
- Render and Vercel accounts for deployment

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-ai-poetry-generation.git
   ```

2. **Frontend Setup**:
   Navigate to the frontend directory and install the dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup**:
   Navigate to the backend directory and set up a virtual environment, then install the required packages:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

### Running the App Locally

1. **Backend**:
   Start the Flask server:
   ```bash
   cd backend
   flask run
   ```

2. **Frontend**:
   Run the frontend React application:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and go to `https://verse-craft.vercel.app/`.

### Deployment

- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render.

## Thought Process

The main focus of this project was to create an engaging user experience that blends advanced machine learning features with an intuitive and visually appealing interface. The real-time poem generation with streamed output and emotion visualization are designed to make the application feel interactive and dynamic. By incorporating presets for different poem types, the app aims to offer flexibility while ensuring ease of use.

## Enhancements

- Added functionality for preset poem types (e.g., sonnet, haiku) to streamline the poem generation process.
- The application generates a random poem if no prompt is provided by the user.


