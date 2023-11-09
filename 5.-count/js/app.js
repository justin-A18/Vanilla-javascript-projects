// Define la fecha objetivo (puedes cambiar esta fecha según tus necesidades)
const fechaObjetivo = new Date('2023-12-25T00:00:00Z');

// Función para actualizar el contador
function actualizarContador() {
  const ahora = new Date();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    // La fecha objetivo ha pasado, puedes tomar alguna acción aquí si lo deseas
    document.getElementById('title').textContent = '¡Lanzamiento en curso!';
    document.getElementById('counter').style.display = 'none';
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  // Actualiza los elementos HTML con los valores calculados
  document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
  document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
  document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
  document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');

  const daysElement = document.getElementById('days');
  daysElement.setAttribute('data-before', dias.toString().padStart(2, '0'));
  const hoursElement = document.getElementById('hours');
  hoursElement.setAttribute('data-before', horas.toString().padStart(2, '0'));
  const minutesElement = document.getElementById('minutes');
  minutesElement.setAttribute('data-before', minutos.toString().padStart(2, '0'));
  const secondsElement = document.getElementById('seconds');
  secondsElement.setAttribute('data-before', segundos.toString().padStart(2, '0'));


}

// Actualiza el contador inicialmente
actualizarContador();

// Actualiza el contador cada segundo
setInterval(actualizarContador, 1000);
