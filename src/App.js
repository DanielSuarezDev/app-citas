import { useState, useEffect } from "react";
import { Cita } from "./components/Cita";
import { Formulario } from "./components/Formulario";

function App() {
  //localStore
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if (!citasIniciales) {
    citasIniciales = []
  }



  const [citas, setCitas] = useState(citasIniciales);

  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };
  const handleDelete = (id) => {
    const nuevasCitas = citas.filter((cita) =>  cita.id !== id);
    setCitas(nuevasCitas)
  };

  const title = citas.length === 0  ? <h1>Agrega una cita</h1> : <h1>Administra tus citas</h1>
 
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas])

  return (
    <div className="App">
      <h1>Administrador de tareas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            {title}
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} handleDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
