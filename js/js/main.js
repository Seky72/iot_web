const apiUrl = "http://44.194.201.223:5000/devices"; // Cambia si usas IP pública

const statusMap = {
  1: "Adelante",
  2: "Atrás",
  3: "Detener",
  4: "Vuelta adelante derecha",
  5: "Vuelta adelante izquierda",
  6: "Vuelta atrás derecha",
  7: "Vuelta atrás izquierda",
  8: "Giro 90° derecha",
  9: "Giro 90° izquierda",
  10: "Giro 360° derecha",
  11: "Giro 360° izquierda"
};

async function fetchLastStatus() {
  try {
    const res = await fetch(`${apiUrl}/devices/last-status`);
    const data = await res.json();
    document.getElementById("movement").textContent = data[0]?.status_texto || "Sin datos";
  } catch (err) {
    document.getElementById("movement").textContent = "Error de conexión";
  }
}

async function sendCommand(status_clave) {
  const payload = {
    name: "Control Web",
    ip: "0.0.0.0",
    status_clave: status_clave,
    status_texto: statusMap[status_clave]
  };

  try {
    await fetch(`${apiUrl}/devices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    fetchLastStatus(); // actualiza el estado mostrado
  } catch (err) {
    alert("Error al enviar el comando");
  }
}

// Consulta inicial
fetchLastStatus();
