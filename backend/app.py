import pickle
import numpy as np
from flask import Flask, request, jsonify
from sklearn.preprocessing import StandardScaler

# Crear la aplicación Flask
app = Flask(__name__)

# Cargar el modelo y el escalador
with open('churn_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Ruta para hacer la predicción
@app.route('/api/predict', methods=['POST'])
def predict():
    # Obtener los datos de la solicitud
    data = request.get_json()
    user_data = np.array([
        data['edad'],
        data['tiempo_uso'],
        data['interacciones'],
        data['libros_leidos']
    ]).reshape(1, -1)
    
    # Escalar los datos de entrada
    user_data_scaled = scaler.transform(user_data)
    
    # Realizar la predicción usando el modelo
    prediction = model.predict(user_data_scaled)
    
    # Retornar el resultado de la predicción (1: abandono, 0: no abandono)
    return jsonify({'churn_prediction': int(prediction[0])})

# Ruta para obtener las métricas del modelo (precisión, recall, etc.)
@app.route('/api/model-metrics', methods=['GET'])
def get_model_metrics():
    # Esto debería retornar las métricas del modelo guardado o calculadas
    metrics = {
        "accuracy": 0.85,  # Ejemplo
        "precision": 0.80,
        "recall": 0.75,
        "f1_score": 0.77
    }
    return jsonify(metrics)

if __name__ == '__main__':
    app.run(debug=True)
