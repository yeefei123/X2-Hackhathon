import io

import torch
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Load your YOLO model
model = YOLO('best.pt')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # Perform inference
    results = model(img)
    results_json = results.pandas().xyxy[0].to_json(orient="records")
    print(results)
    return results_json

if __name__ == '__main__':
    app.run(debug=True)
