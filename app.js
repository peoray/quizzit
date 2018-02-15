var pos = 0;
var correct = 0;
var question;

var questions = [
  ["What is 2 x 2?", "4", "5", "6", "7", "A"],
  ["What is 2 x 3?", "4", "5", "6", "7", "C"],
  ["What is 2 x 4?", "4", "8", "6", "7", "B"],
  ["What is 2 x 5?", "4", "5", "6", "10", "D"]
];

let getElement = (x) => {return document.getElementById(x);}

let renderQuestion = () => {
    getElement('test-status').innerHTML = `Question ${pos + 1} of ${questions.length}`;
    question = questions[pos][0];
    console.log(question);
    var optionA = questions[pos][1];
    var optionB = questions[pos][2];
    var optionC = questions[pos][3];
    var optionD = questions[pos][4];
    
    getElement('test').innerHTML = `
        <h3> ${question} </h3>
        <input type="radio" name="options" value="A">${optionA} <br>
        <input type="radio" name="options" value="C">${optionB} <br>
        <input type="radio" name="options" value="B">${optionC} <br>
        <input type="radio" name="options" value="D">${optionD} <br><br>
        <button type="button" onclick="checkAnswer()">Submit Answer</button>
      `;

      if (pos >= questions.length) {
          getElement('test').innerHTML = `You got ${correct} of ${questions.length} questions correct`;
          getElement('test-status').innerHTML = `Test Completed`;
          pos = 0;
          correct = 0;
          return false;
      }
}

 let checkAnswer = () => {
      let choices = document.getElementsByName('options');
     choices.forEach((ch) => {
         if(ch.checked) {
             var choice = ch.value;
         }
     });

     if (choice = questions[pos][5]) {
         correct++;
     }
     pos++;
     
     renderQuestion();
 }

//  getElement('submit').addEventListener('click', checkAnswer);

window.addEventListener('load', function(){
    renderQuestion();
});