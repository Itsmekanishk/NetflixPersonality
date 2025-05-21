// Custom Netflix Personality Quiz Logic

const questions = [
  {
    question: "You're stuck in the Upside Down. What do you do first?",
    options: [
      { text: "Use my powers to find Eggos.", personality: { "Eleven": 1 } },
      { text: "Pull out a map and form a strategy.", personality: { "Hermione": 1 } },
      { text: "Panic, but make it look cute.", personality: { "Rose": 1 } },
      { text: "Start dancing like Monjulika to scare them.", personality: { "Monjulika": 1 } },
    ],
  },
  {
    question: "You're at Hogwarts. Which spell do you cast first?",
    options: [
      { text: "Wingardium Leviosa to levitate coffee.", personality: { "Hermione": 1 } },
      { text: "Expecto Patronum to keep boys away.", personality: { "Strawberry": 1 } },
      { text: "Accio tomato bhindi (even if I don't know how to cook it).", personality: { "Rose": 1 } },
      { text: "Petrificus Totalus... so no one sees me nap after coffee.", personality: { "Monjulika": 1 } },
    ],
  },
  {
    question: "In a Titanic moment, the boat is sinking. What do you do?",
    options: [
      { text: "Sacrifice my life for love.", personality: { "Rose": 1 } },
      { text: "Build a raft with logic and survive.", personality: { "Hermione": 1 } },
      { text: "Scream 'Chaddit raha' and jump stylishly.", personality: { "Monjulika": 1 } },
      { text: "Sip tea and let the Crown handle it.", personality: { "Queen Elizabeth": 1 } },
    ],
  },
  {
    question: "Your Someone flirts with you. You...",
    options: [
      { text: "Blush and say 'Chaddit raha.'", personality: { "Strawberry": 1 } },
      { text: "Cast a silence spell.", personality: { "Hermione": 1 } },
      { text: "Flirt back harder while making dramatic eye contact.", personality: { "Rose": 1 } },
      { text: "Laugh like a villain and vanish.", personality: { "Monjulika": 1 } },
    ],
  },
  {
    question: "Rain is pouring outside. What's your vibe?",
    options: [
      { text: "I beg my mom to let me go out.", personality: { "Strawberry": 1 } },
      { text: "I get locked in the balcony but still enjoy it.", personality: { "Monjulika": 1 } },
      { text: "I journal poetic stuff while watching the raindrops.", personality: { "Rose": 1 } },
      { text: "I build a rain shelter for others.", personality: { "Hermione": 1 } },
    ],
  },
  {
    question: "You're asked to cook tomato bhindi. You...",
    options: [
      { text: "Say 'Umm... I have coffee instead?'", personality: { "Monjulika": 1 } },
      { text: "Watch a YouTube tutorial and try anyway.", personality: { "Strawberry": 1 } },
      { text: "Order food and pretend I made it.", personality: { "Rose": 1 } },
      { text: "Magically make someone else do it.", personality: { "Queen Elizabeth": 1 } },
    ],
  },
  {
    question: "Jim pranks Dwight again. What's your ideal prank?",
    options: [
      { text: "Replace his wand with a carrot.", personality: { "Hermione": 1 } },
      { text: "Make him fall for fake bhindi recipe links.", personality: { "Monjulika": 1 } },
      { text: "Tell him Rose is calling from Titanic.", personality: { "Rose": 1 } },
      { text: "Tell him he's now the Prince of Rainland.", personality: { "Strawberry": 1 } },
    ],
  },
  {
    question: "Michael Scott gives you the 'World's Best Boss' mug. You…",
    options: [
      { text: "Start crying like Rose on the Titanic deck.", personality: { "Rose": 1 } },
      { text: "Yell 'I am Beyoncé, always.'", personality: { "Strawberry": 1 } },
      { text: "Politely correct his grammar.", personality: { "Hermione": 1 } },
      { text: "Try to cook tomato bhindi in it.", personality: { "Monjulika": 1 } },
    ],
  },
];

const characters = {
  "Eleven": {
    description: "Bold & emotional 🧠 You feel things deeply and aren't afraid to show it! ⚡",
    image: "./images/View recent photos.jpeg",
  },
  "Hermione": {
    description: "Smart & bossy 📚 Your intelligence and leadership skills are unmatched! ✨",
    image: "./images/1670899366_5.webp",
  },
  "Rose": {
    description: "Romantic drama queen. You bring the passion and drama to every situation!",
    image: "./images/IMG_1779.JPG",
  },
  "Monjulika": {
    description: "Chaotic & funny. You keep everyone on their toes with your unpredictable humor!",
    image: "./images/IMG_3168.PNG",
  },
  "Strawberry": {
    description: "Sweet & sarcastic. You're as sweet as can be, with a hint of sass!",
    image: "./images/IMG_8596.JPEG",
  },
  "Queen Elizabeth": {
    description: "Royal & chill 👑 You handle drama with a sip of tea and a royal wave! ☕",
    image: "https://i.imgur.com/6Q9Z1Zm.png", // Replace with a funny Queen image
  },
};

const finalMessages = [
  "You may not cook bhindi, but you cooked my heart!",
  "Like Eleven's powers, you've got me under your spell!",
  "You're more magical than all of Hogwarts combined!",
  "My heart is doing a Stranger Things-style flip for you!",
  "You're the Netflix to my chill!",
];

let currentQuestion = 0;
let personalityScores = {
  "Eleven": 0,
  "Hermione": 0,
  "Rose": 0,
  "Monjulika": 0,
  "Strawberry": 0,
  "Queen Elizabeth": 0,
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.querySelector('.progress');
const resultImage = document.getElementById('result-image');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const personalityPercentages = document.getElementById('personality-percentages');
const finalMessage = document.getElementById('final-message');
const restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  optionsContainer.innerHTML = '';

  question.options.forEach(option => {
    const button = document.createElement('div');
    button.className = 'option';
    button.textContent = option.text;
    button.addEventListener('click', () => selectAnswer(option.personality));
    optionsContainer.appendChild(button);
  });

  // Update progress bar
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function selectAnswer(personality) {
  // Add points to personality scores
  Object.entries(personality).forEach(([character, points]) => {
    personalityScores[character] += points;
  });

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  // Calculate percentages
  const total = Object.values(personalityScores).reduce((a, b) => a + b, 0);
  const percentages = {};
  Object.entries(personalityScores).forEach(([character, score]) => {
    percentages[character] = Math.round((score / total) * 100);
  });

  // Sort personalities by percentage
  const sortedPersonalities = Object.entries(percentages)
    .sort(([, a], [, b]) => b - a);

  // Display top two personalities
  const [topPersonality, secondPersonality] = sortedPersonalities;

  resultTitle.textContent = `You're ${topPersonality[1]}% ${topPersonality[0]}${secondPersonality ? ", " + secondPersonality[1] + "% " + secondPersonality[0] : ''}`;
  resultDescription.textContent = characters[topPersonality[0]].description;
  resultImage.src = characters[topPersonality[0]].image;

  // Show personality bars
  personalityPercentages.innerHTML = '';
  sortedPersonalities.forEach(([character, percentage]) => {
    const barContainer = document.createElement('div');
    barContainer.innerHTML = `
      <div class="personality-bar">
        <div class="personality-fill" style="width: ${percentage}%"></div>
      </div>
      <p>${character}: ${percentage}%</p>
    `;
    personalityPercentages.appendChild(barContainer);
  });

  // Show random final message
  finalMessage.textContent = finalMessages[Math.floor(Math.random() * finalMessages.length)];
}

function restartQuiz() {
  currentQuestion = 0;
  personalityScores = {
    "Eleven": 0,
    "Hermione": 0,
    "Rose": 0,
    "Monjulika": 0,
    "Strawberry": 0,
    "Queen Elizabeth": 0,
  };
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
} 