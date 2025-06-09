let playerName = "";
const questions = [
  {
    question: "¿Qué es el phishing?",
    answers: [
      { text: "Un tipo de pesca digital", correct: false },
      { text: "Un intento de engañar a alguien para obtener datos sensibles", correct: true },
      { text: "Un antivirus", correct: false }
    ]
  },
  {
    question: "¿Cuál es una contraseña segura?",
    answers: [
      { text: "123456", correct: false },
      { text: "MiNombre2024", correct: false },
      { text: "xD$7gT!9v@Q", correct: true }
    ]
  },
  {
    question: "¿Qué archivo podría contener malware?",
    answers: [
      { text: "informe.pdf", correct: false },
      { text: "factura.exe", correct: true },
      { text: "foto.jpg", correct: false }
    ]
  },
  {
    question: "¿Qué hacer si recibes un correo sospechoso?",
    answers: [
      { text: "Abrirlo para investigar", correct: false },
      { text: "Hacer clic en el enlace", correct: false },
      { text: "Reportarlo y eliminarlo", correct: true }
    ]
  },
  {
  question: "¿Qué es un firewall?",
  answers: [
    { text: "Un programa para editar documentos", correct: false },
    { text: "Una herramienta que bloquea accesos no autorizados a la red", correct: true },
    { text: "Una aplicación de mensajería", correct: false }
  ]
},
{
  question: "¿Qué deberías hacer antes de conectarte a una red WiFi pública?",
  answers: [
    { text: "Ver si tiene buena señal", correct: false },
    { text: "Conectarte sin pensarlo", correct: false },
    { text: "Evitar ingresar datos sensibles o usar una VPN", correct: true }
  ]
},
{
  question: "¿Qué significa tener la autenticación en dos pasos (2FA)?",
  answers: [
    { text: "Ingresar dos veces la contraseña", correct: false },
    { text: "Usar dos dispositivos distintos para acceder", correct: false },
    { text: "Agregar un segundo método de verificación como un código SMS", correct: true }
  ]
},
{
  question: "¿Cuál de estos comportamientos es más seguro?",
  answers: [
    { text: "Guardar tus contraseñas en un archivo de texto", correct: false },
    { text: "Usar el mismo password en todos tus servicios", correct: false },
    { text: "Utilizar un gestor de contraseñas", correct: true }
  ]
},
{
  question: "¿Qué puede indicar que un sitio web es seguro?",
  answers: [
    { text: "Que tenga música de fondo", correct: false },
    { text: "Que la URL comience con 'https' y tenga un candado", correct: true },
    { text: "Que el sitio tenga colores llamativos", correct: false }
  ]
},
{
  question: "¿Qué es el ransomware?",
  answers: [
    { text: "Un software para mejorar el rendimiento del PC", correct: false },
    { text: "Un tipo de virus que roba tu contraseña", correct: false },
    { text: "Un malware que secuestra tus archivos y pide rescate", correct: true }
  ]
}
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

const startGame=()=> {
  const nameInput = document.getElementById("player-name");
  playerName = nameInput.value.trim();

  if (playerName === "" || playerName.length<=4) {
    alert("Por favor ingresa tu nombre completo");
    return;
  }

  // Ocultar login y mostrar juego
  document.querySelector(".login-container").style.display = "none";
  document.querySelector(".game-container").style.display = "block";
   // Mezclar preguntas antes de iniciar
  mezclarPreguntas(questions);
  showQuestion();
}


const showQuestion=()=> {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.onclick = () => selectAnswer(button, answer.correct);
    answersElement.appendChild(button);
  });
}

const resetState=()=> {
  answersElement.innerHTML = "";
  nextButton.style.display = "none";
}

const selectAnswer =(button, isCorrect)=> {
  const buttons = answersElement.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }
  scoreElement.textContent = `Puntaje: ${score}`;
  nextButton.style.display = "inline-block";
}

const nextQuestion=()=> {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
}

const showFinalScore=()=> {
  let emoji = score >= 7 ? "😊" : "😞";
  questionElement.textContent = `Juego terminado. Tu puntaje final es: ${score} de ${questions.length} ${emoji}`;
  answersElement.innerHTML = "";
  nextButton.style.display = "none";
  // Guardar en localStorage
  const existingData = JSON.parse(localStorage.getItem("puntajes")) || [];
  existingData.push({ nombre: playerName, puntaje: score });
  localStorage.setItem("puntajes", JSON.stringify(existingData));
 // Mostrar botón de ver puntajes
  document.getElementById("ver-puntajes-btn").style.display = "inline-block";
  document.getElementById("reiniciar-btn").style.display = "inline-block";
}

const verPuntajes=()=> {
  const lista = document.getElementById("score-list");
  lista.innerHTML = "";
  const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];

  puntajes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre}: ${item.puntaje} puntos`;
    lista.appendChild(li);
  });
}

function nuevoParticipante() {
  window.location="index.html"
}

function mezclarPreguntas(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
showQuestion();
