from flask import Flask, render_template, request, jsonify, Response
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import google.generativeai as genai
import os
from transformers import pipeline

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Load the model once during initialization
emotion_analyzer = pipeline(
    'text-classification',
    model='bhadresh-savani/distilbert-base-uncased-emotion',
    return_all_scores=True
)

def generate_poem(poemType, prompt, lang, poemLength, rhymeScheme, creativityLevel, wordsPerLine):
    try:
        if prompt == "":
            full_prompt = f"""
            Create a {poemType} poem in {lang}. 
            The poem should be {poemLength} in length, follow a {rhymeScheme} rhyme scheme, 
            and maintain a creativity level of {creativityLevel}. 
            Each line should have approximately {wordsPerLine} words.
            Feel free to experiment with style and tone to keep the poem engaging and expressive. 
            Use descriptive language to evoke strong imagery and emotions, 
            ensuring that all instructions are reflected in the poem.
            MAKE SURE TO ADHERE TO THE RHYME SCHEME.
            """
        else:
            full_prompt = f"""
            Write a {poemType} poem on the topic '{prompt}' in {lang}. 
            The poem should be {poemLength} in length, follow a {rhymeScheme} rhyme scheme, 
            and maintain a creativity level of {creativityLevel}. 
            Each line should have approximately {wordsPerLine} words.
            Focus on the essence of the topic, using creativity in style, structure, and tone. 
            Enhance the imagery with descriptive language, 
            while ensuring all given instructions and parameters are followed in the final poem.
            MAKE SURE TO ADHERE TO THE RHYME SCHEME.
            """

        model = genai.GenerativeModel('gemini-1.0-pro-latest')
        response = model.generate_content(full_prompt)
        return response.text  
    except Exception as e:
        return f"Whoops! It's not your day. Try again :("

def analyze_emotions(poem):
    try:
        results = emotion_analyzer(poem)
        
        emotion_scores = {}

        for result in results[0]: 
            emotion_scores[result['label']] = result['score']

        total_score = sum(emotion_scores.values())
        
        for emotion in emotion_scores:
            emotion_scores[emotion] = (emotion_scores[emotion] / total_score) * 100

        return emotion_scores
    except Exception as e:
        return {'error': str(e)}

def process_poem_generation(data):
    prompt = data.get('prompt')
    lang = data.get('language')
    poemType = data.get('selectedType')
    poemLength = data.get('poemLength')
    rhymeScheme = data.get('rhymeScheme')
    creativityLevel = data.get('creativity')
    wordsPerLine = data.get('wordsPerLine')
    
    app.logger.info(f"Received prompt: {prompt}, language: {lang}")
    
    generated_poem = generate_poem(
      poemType,
      prompt,
      lang,
      poemLength,
      rhymeScheme,
      creativityLevel,
      wordsPerLine)
    
    analyzed_emotions = analyze_emotions(generated_poem)
    
    return {'poem': generated_poem, 'emotions': analyzed_emotions}

@app.route('/generate_poem', methods=['POST'])
def generate_poem_route():
    data = request.get_json()
    result = process_poem_generation(data)
    return jsonify(result)

@socketio.on('generate_poem')
def handle_generate_poem(data):
    result = process_poem_generation(data)
    emit('poem_response', result)

if __name__ == '__main__':
    socketio.run(app, allow_unsafe_werkzeug=True, host='0.0.0.0', port=5000)
