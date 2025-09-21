const dateElement = document.getElementById('current-date');
const timeElement = document.getElementById('current-time');
const responsableInput = document.getElementById('responsable-input');

function formatDateTime(now) {
  const dateFormatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return {
    date: dateFormatter.format(now),
    time: timeFormatter.format(now)
  };
}

function updateDateTime() {
  const now = new Date();
  const { date, time } = formatDateTime(now);

  if (dateElement) {
    dateElement.textContent = date;
  }

  if (timeElement) {
    timeElement.textContent = time;
  }
}

updateDateTime();
setInterval(updateDateTime, 1000);

const RESPONSABLE_STORAGE_KEY = 'pantaleon.responsable';

if (responsableInput) {
  try {
    const savedResponsable = localStorage.getItem(RESPONSABLE_STORAGE_KEY);
    if (savedResponsable) {
      responsableInput.value = savedResponsable;
    }
  } catch (error) {
    console.warn('No se pudo recuperar el responsable almacenado.', error);
  }

  responsableInput.addEventListener('input', (event) => {
    try {
      localStorage.setItem(RESPONSABLE_STORAGE_KEY, event.target.value.trim());
    } catch (error) {
      console.warn('No se pudo guardar el responsable.', error);
    }
  });
}
