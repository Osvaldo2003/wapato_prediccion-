import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function AdminDashboard() {
    const [churnData, setChurnData] = useState(null);
    const [modelMetrics, setModelMetrics] = useState(null);

    useEffect(() => {
        // Obtener los datos de predicción de abandono
        axios.post('http://localhost:5000/api/predict', {
            edad: 25,  // Ejemplo de entrada
            tiempo_uso: 5,
            interacciones: 200,
            libros_leidos: 50
        })
        .then(response => {
            console.log(response.data);
            setChurnData(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los datos de predicción:', error);
        });

        // Obtener las métricas del modelo
        axios.get('http://localhost:5000/api/model-metrics')
        .then(response => {
            setModelMetrics(response.data);
        })
        .catch(error => {
            console.error('Error al obtener las métricas del modelo:', error);
        });
    }, []);

    const data = {
        labels: ['Usuario 1', 'Usuario 2', 'Usuario 3'],  // Ejemplo de usuarios
        datasets: [{
            label: 'Predicción de Abandono',
            data: churnData ? [0, 1, 0] : [],  // Resultados de la predicción
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div>
            <h1>Dashboard de Administrador</h1>

            {modelMetrics && (
                <div>
                    <h2>Métricas del Modelo</h2>
                    <p>Precisión: {modelMetrics.accuracy}</p>
                    <p>Precisión (Precision): {modelMetrics.precision}</p>
                    <p>Recall: {modelMetrics.recall}</p>
                    <p>F1-Score: {modelMetrics.f1_score}</p>
                </div>
            )}

            <div>
                <h2>Gráfico de Predicción de Abandono</h2>
                <Line data={data} />
            </div>
        </div>
    );
}

export default AdminDashboard;
