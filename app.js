let pos = 0;
let correct = 0;

const questions = [
  ["What is 2 x 2?", "4", "5", "6", "7", "A"],
  ["What is 2 x 3?", "4", "5", "6", "7", "C"],
  ["What is 2 x 4?", "4", "8", "6", "7", "B"],
  ["What is 2 x 5?", "4", "5", "6", "10", "D"]
];

// arrow functions allow for implicit returns, also prefer const whenever you can
const getElement = x => document.getElementById(x);
// These elements are always present so we can "fetch" them and then reuse the variables
const testEl = getElement("test");
const testStatusEl = getElement("test-status");

const checkEnd = () => {
  if (pos >= questions.length) {
    testEl.innerHTML = `You got ${correct} of ${
      questions.length
    } questions correct`;

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
  getElement("submit").removeEventListener("click", checkAnswer);

  //render next question
  renderQuestion();
};

window.addEventListener("load", renderQuestion);
