import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminAnalytics() {
  const [churn, setChurn] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    axios.get('/admin/analytics/churn-risk').then(r => setChurn(r.data));
    axios.get('/admin/analytics/genre-popularity').then(r => setGenres(r.data));
    axios.get('/admin/analytics/action-distribution').then(r => setActions(r.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Predictive Analytics</h1>

      <section>
        <h2>Riesgo de Abandono</h2>
        <table border="1">
          <thead>
            <tr><th>User ID</th><th>Username</th><th>Última Acción</th><th>Acciones Totales</th><th>Riesgo</th></tr>
          </thead>
          <tbody>
            {churn.map(u => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>{u.username}</td>
                <td>{u.ultima_accion}</td>
                <td>{u.total_acciones}</td>
                <td>{u.riesgo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Popularidad de Géneros</h2>
        <table border="1">
          <thead><tr><th>Género ID</th><th>Interacciones</th></tr></thead>
          <tbody>
            {genres.map(g => (
              <tr key={g.genero_id}>
                <td>{g.genero_id}</td>
                <td>{g.interacciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Distribución de Acciones</h2>
        <table border="1">
          <thead><tr><th>Acción</th><th>Total</th></tr></thead>
          <tbody>
            {actions.map(a => (
              <tr key={a.action}>
                <td>{a.action}</td>
                <td>{a.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
