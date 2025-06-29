import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [plugins, setPlugins] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/plugins')
      .then(res => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setPlugins(data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al obtener plugins:', err);
        setError('No se pudo obtener los plugins. Revisa el servidor.');
        setCargando(false);
      });
  }, []);

  const eliminarPlugin = (id) => {
    const confirmado = window.confirm("¿Estás seguro de que querés eliminar este plugin?");
    if (confirmado) {
      setPlugins(prev => prev.filter(plugin => plugin.id !== id));
      // Aquí podrías agregar llamada al backend para eliminar también en BD
    }
  };

  // Navegar a la ruta interna para editar o crear plugin
  const editarPlugin = (plugin) => {
    // Si plugin no tiene id (crear), se puede enviar sin id o id vacío
    const params = new URLSearchParams();
    if (plugin && plugin.id) {
      params.append('id', plugin.id);
    }
    navigate(`/editar-plugin?${params.toString()}`);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', }}>
      <h1 style={{ textAlign:'center' }}>PLUGINS</h1>
      {cargando && <p>⏳ Cargando plugins...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!cargando && plugins.length === 0 && !error && <p>No hay plugins para mostrar.</p>}

      <button
        onClick={() => editarPlugin({})} // abrir formulario en blanco para crear nuevo
        style={{
          marginBottom: '35px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          padding: '8px 8px',
          borderRadius: '10px',
          cursor: 'pointer',
          
        
        }}
      >
        Crear Nuevo Plugin
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifycontent: 'space-around', gap: '20px' }}>
        {plugins.map(plugin => (
          <div key={plugin.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: 'black',
            padding: '50px',
            width: '200px',
            
          }}>
            <img src={plugin.imagen} alt={plugin.nombre} style={{ width: '100%', borderRadius: '10px' }} />
            <h2>{plugin.nombre}</h2>
            <p><strong>Tipo:</strong> {plugin.tipo}</p>
            <p><strong>Empresa:</strong> {plugin.empresa}</p>
            <p><strong>Aplicación:</strong> {plugin.aplicacion}</p>
            <p><strong>Gratis:</strong> {plugin.gratis ? 'Sí' : 'No'}</p>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
              <button
                onClick={() => editarPlugin(plugin)}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px'
                }}
              >
                - Editar -
              </button>
              <button
                onClick={() => eliminarPlugin(plugin.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;