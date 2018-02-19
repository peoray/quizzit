let pos = 0;
let correct = 0;

const questions = [
  ["What is 2 x 1?", "4", "2", "6", "7", "B"],
  ["What is 2 x 2?", "4", "5", "6", "7", "A"],
  ["What is 2 x 3?", "4", "8", "6", "7", "C"],
  ["What is 2 x 4?", "4", "8", "6", "7", "B"],
  ["What is 2 x 5?", "4", "12", "6", "10", "D"],
  ["What is 2 x 6?", "4", "12", "6", "10", "B"],
  ["What is 2 x 7?", "14", "18", "16", "17", "A"],
  ["What is 2 x 8?", "15", "16", "17", "18", "B"],
  ["What is 2 x 9?", "12", "16", "18", "19", "C"],
  ["What is 2 x 10?", "20", "16", "18", "10", "A"]
];

// arrow functions allow for implicit returns, also prefer const whenever you can
const getElement = x => document.getElementById(x);
// These elements are always present so we can "fetch" them and then reuse the variables
const testEl = getElement("test");
const testStatusEl = getElement("test-status");

const checkEnd = () => {
  let pictures = ["img/win.gif", "img/meh.jpeg", "img/lose.gif"];
  let messages = [
    "Great job!",
    "That's just okay",
    "You really need to do better"
  ];
  let score;

  if (correct === 0) score = 2;

  if (correct > 0 && correct <= 5) score = 1;

  if (correct > 5) score = 0;

  if (pos >= questions.length) {
    testEl.innerHTML = `
        <p>You got ${correct} of ${questions.length} questions correct</p>
        <p>${messages[score]}</p>
        <img src="${pictures[score]}" alt="Gif">
        <button type="button" id="play-again">Play Again</button>
    `;

    getElement("play-again").addEventListener("click", playAgain);

    testStatusEl.innerHTML = `Test Completed`;
    pos = 0;
    correct = 0;
    return true;
  }
  return false;
};

const renderQuestion = () => {
  // check if its end, if true return so it breaks out of the function.
  if (checkEnd()) return;

  // destructure the elements and assign them all to const variables using one line.
  const [question, optionA, optionB, optionC, optionD] = questions[pos];

  testStatusEl.innerHTML = `Question ${pos + 1} of ${questions.length}`;
  testEl.innerHTML = `
        <h3>${question}</h3>
        <input type="radio" name="options" value="A">${optionA} <br>
        <input type="radio" name="options" value="C">${optionB} <br>
        <input type="radio" name="options" value="B">${optionC} <br>
        <input type="radio" name="options" value="D">${optionD} <br><br>
        <button type="button" id="submit">Submit Answer</button>
        `;
  // setup eventlistener for the button with id "submit"
  getElement("submit").addEventListener("click", checkAnswer);
};

const checkAnswer = () => {
  // get choices array and turn it from a NodeList to an Array so we can utilise Array Methods
  const choices = Array.from(document.getElementsByName("options"));
  // use the Array.find() method to find the choice that has the checked value to true, and then take the value of the HTML input the find function returns.
  const choice = choices.find(({ checked }) => checked).value;

  // if correct increase by one
  if (choice === questions[pos][5]) correct += 1;

  // move position forward
  pos += 1;

  // remove the previous event listener;
  // getElement("submit").removeEventListener("click", checkAnswer);

  //render next question
  renderQuestion();
};

const playAgain = () => {
  return window.location.reload();
};

window.addEventListener("load", renderQuestion);
