import { useEffect, useState } from 'react';
import styles from './styles';

function App() {
  const [candidatos, setCandidatos] = useState([]);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [puesto, setPuesto] = useState('');
  const [candidatoAEliminar, setCandidatoAEliminar] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');


  const total = candidatos.length;
  const contratados = candidatos.filter(c => c.estado === 'contratado').length;
  const entrevistas = candidatos.filter(c => c.estado === 'entrevista').length;
  const rechazados = candidatos.filter(c => c.estado === 'rechazado').length;


  const candidatosFiltrados = [...candidatos]
    .filter(c =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter(c =>
      filtroEstado === 'todos' ? true : c.estado === filtroEstado
    )
    .sort(
      (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
    );

  const obtenerCandidatos = async () => {
    const res = await fetch('http://localhost:3000/candidatos');
    const data = await res.json();
    setCandidatos(data);
  };

  const confirmarEliminacion = async () => {
    if (!candidatoAEliminar) return;

    await fetch(`http://localhost:3000/candidatos/${candidatoAEliminar.id}`, {
      method: 'DELETE'
    });

    setCandidatoAEliminar(null);
    obtenerCandidatos();
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    await fetch(`http://localhost:3000/candidatos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    });

    obtenerCandidatos();
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'contratado':
        return '#27ae60';
      case 'rechazado':
        return '#e74c3c';
      case 'entrevista':
        return '#f39c12';
      default:
        return '#7f8c8d';
    }
  };

  const obtenerColorFila = (estado) => {
    switch (estado) {
      case 'contratado':
        return '#eafaf1';
      case 'rechazado':
        return '#fdecea';
      case 'entrevista':
        return '#fef5e7';
      default:
        return 'white';
    }
  };

  useEffect(() => {
    obtenerCandidatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email) return;

    setCargando(true);

    await fetch('http://localhost:3000/candidatos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, telefono, puesto })
    });

    setNombre('');
    setEmail('');
    setTelefono('');
    setPuesto('');
    setCargando(false);

    obtenerCandidatos();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Dashboard de Candidatos</h1>


        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h3>Total</h3>
            <p>{total}</p>
          </div>

          <div style={{ ...styles.card, backgroundColor: '#eafaf1' }}>
            <h3>Contratados</h3>
            <p>{contratados}</p>
          </div>

          <div style={{ ...styles.card, backgroundColor: '#fef5e7' }}>
            <h3>Entrevista</h3>
            <p>{entrevistas}</p>
          </div>

          <div style={{ ...styles.card, backgroundColor: '#fdecea' }}>
            <h3>Rechazados</h3>
            <p>{rechazados}</p>
          </div>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} placeholder="Nombre y Apellido" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={styles.input} placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <input style={styles.input} placeholder="Puesto" value={puesto} onChange={(e) => setPuesto(e.target.value)} />

          <button style={styles.addButton} type="submit" disabled={cargando}>
            {cargando ? 'Agregando...' : '+ Agregar'}
          </button>
        </form>

        {/*FILTROS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            style={{ ...styles.input, flex: 1 }}
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            style={styles.input}
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="postulado">Postulado</option>
            <option value="entrevista">Entrevista</option>
            <option value="contratado">Contratado</option>
            <option value="rechazado">Rechazado</option>
          </select>

          <button
            onClick={() => {
              setBusqueda('');
              setFiltroEstado('todos');
            }}
          >
            Limpiar
          </button>
        </div>

        {/* TABLA */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Teléfono</th>
              <th style={styles.th}>Puesto</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {candidatosFiltrados.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No se encontraron resultados
                </td>
              </tr>
            )}

            {candidatosFiltrados.map((c) => (
              <tr
                key={c.id}
                style={{
                  backgroundColor: obtenerColorFila(c.estado),
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
              >
                <td style={styles.td}>{c.nombre}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={styles.td}>{c.telefono}</td>
                <td style={styles.td}>{c.puesto}</td>
                <td style={styles.td}>
                  <select
                    value={c.estado}
                    onChange={(e) => actualizarEstado(c.id, e.target.value)}
                    style={{
                      ...styles.select,
                      backgroundColor: obtenerColorEstado(c.estado),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    <option value="postulado">Postulado</option>
                    <option value="entrevista">Entrevista</option>
                    <option value="contratado">Contratado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button style={styles.deleteButton} onClick={() => setCandidatoAEliminar(c)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {candidatoAEliminar && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <p>
              ¿Eliminar a <strong>{candidatoAEliminar.nombre}</strong>?
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button style={styles.deleteButton} onClick={confirmarEliminacion}>
                Sí, eliminar
              </button>

              <button onClick={() => setCandidatoAEliminar(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;