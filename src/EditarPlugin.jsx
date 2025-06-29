import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function EditarPlugin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tomamos ID para saber si es edición o creación
  const id = searchParams.get('id');

  // Estado para campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    empresa: '',
    gratis: false,
    imagen: '',
    aplicacion: ''
  });

  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  // Si tenemos id, cargamos los datos del plugin para editar
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/api/plugins/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el plugin');
        return res.json();
      })
      .then(data => setFormData({
        nombre: data.nombre,
        tipo: data.tipo,
        empresa: data.empresa,
        gratis: Boolean(data.gratis),
        imagen: data.imagen,
        aplicacion: data.aplicacion
      }))
      .catch(err => setError(err.message));
  }, [id]);

  // Manejo inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Enviar formulario para crear o actualizar
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    const url = id ? `http://localhost:3000/api/plugins/${id}` : 'http://localhost:3000/api/plugins';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar el plugin');
        return res.json();
      })
      .then(() => {
        setMensaje('Plugin guardado correctamente');
        setTimeout(() => navigate('/'), 1500); // Volver al home después de 1.5s
      })
      .catch(err => setError(err.message));
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const cardStyle = {
    backgroundColor: '#1a1a2e',
    borderRadius: '16px',
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    border: '1px solid #2a2a3e'
  };

  const titleStyle = {
    color: '#ffffff',
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textAlign: 'center',
    background: 'linear-gradient(100deg,rgb(13, 223, 125) 46%,rgb(196, 13, 0) 66%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const labelStyle = {
    color: '#e2e8f0',
    fontSize: '1.5rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#2d2d42',
    border: '1px solid #3a3a52',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem'
  };

  const checkboxStyle = {
    width: '18px',
    height: '18px',
    accentColor: '#667eea'
  };

  const checkboxLabelStyle = {
    color: '#e2e8f0',
    fontSize: '0.9rem',
    fontWeight: '500'
  };

  const buttonStyle = {
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    padding: '0.875rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    background: ' #000000 )'
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
  };

  const errorStyle = {
    color: '#ef4444',
    backgroundColor: '#1f1f1f',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    border: '1px solid #ef4444',
    marginBottom: '1rem'
  };

  const successStyle = {
    color: '#10b981',
    backgroundColor: '#1f1f1f',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    border: '1px solid #10b981',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>
          {id ? 'Editar Plugin' : 'Crear Plugin'}
        </h1>

        {error && <div style={errorStyle}>{error}</div>}
        {mensaje && <div style={successStyle}>{mensaje}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>
              Nombre del Plugin
            </label>
            <input 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a52'}
              placeholder="Ingresa el nombre del plugin"
            />
          </div>

          <div>
            <label style={labelStyle}>
              Tipo
            </label>
            <input 
              type="text" 
              name="tipo" 
              value={formData.tipo} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a52'}
              placeholder="Ej: Audio, Video, Productividad"
            />
          </div>

          <div>
            <label style={labelStyle}>
              Empresa
            </label>
            <input 
              type="text" 
              name="empresa" 
              value={formData.empresa} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a52'}
              placeholder="Nombre de la empresa desarrolladora"
            />
          </div>

          <div>
            <label style={labelStyle}>
              ¿Es gratis?
            </label>
            <div style={checkboxContainerStyle}>
              <input 
                type="checkbox" 
                name="gratis" 
                checked={formData.gratis} 
                onChange={handleChange}
                style={checkboxStyle}
              />
              <span style={checkboxLabelStyle}>
                Sí, este plugin es gratuito
              </span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              Imagen (URL)
            </label>
            <input 
              type="url" 
              name="imagen" 
              value={formData.imagen} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a52'}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <label style={labelStyle}>
              Aplicación
            </label>
            <input 
              type="text" 
              name="aplicacion" 
              value={formData.aplicacion} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a52'}
              placeholder="Ej: Logic Pro, Ableton Live, Figma"
            />
          </div>

          <button 
            type="submit" 
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 20px rgba(39, 10, 78, 0.98)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {id ? 'Actualizar Plugin' : 'Crear Plugin'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarPlugin;