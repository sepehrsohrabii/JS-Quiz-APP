handleQuizContent = () => {
  var questionList = [
    {
      questionNum: "q1",
      questionText: "How are you today?",
      answerType: "text",
      correctAnswer: "khubam",
      userInput: "",
      point: null,
    },
    {
      questionNum: "q2",
      questionText: "How old are you?",
      answerType: "number",
      correctAnswer: "15",
      userInput: "",
      point: null,
    },
    {
      questionNum: "q3",
      questionText: "Choose one option",
      answerType: "radio",
      correctAnswer: "yes",
      answerOptions: ["yes", "no", "maybe", "ok"],
      userInput: "",
      point: null,
    },
  ];
  questionList.forEach((item) => {
    const questionNum = item["questionNum"];
    const questionText = item["questionText"];
    const answerType = item["answerType"];
    const correctAnswer = item["correctAnswer"];

    if (answerType === "text" || answerType === "number") {
      var answerInput = `<input type=${answerType} name="answer" class="form-control" id=${
        questionNum + "quiz"
      } >`;
    } else if (answerType === "radio") {
      var answerInput = `
      <select class="form-select" multiple aria-label="multiple select example" id=${
        questionNum + "quiz"
      } >
      `;
      for (option in item["answerOptions"]) {
        answerInput =
          answerInput +
          `<option value=${item["answerOptions"][option]}>${item["answerOptions"][option]}</option>`;
      }
      answerInput = answerInput + `</select>`;
    }

    handleView(questionNum, questionText, answerInput, correctAnswer);
  });
  const submitButton = document.getElementById("submit");
  const backButton = document.getElementById("backButton");

  var counter = 0;

  document
    .getElementById(questionList[counter]["questionNum"])
    .classList.add("active");

  submitButton.onclick = () => {
    handleAnswers(questionList);
    if (counter === questionList.length - 1) {
      document.getElementById("quiz").classList.add("d-none");
      handleResultView(questionList);
    } else {
      counter += 1;
      document
        .getElementById(questionList[counter - 1]["questionNum"])
        .classList.remove("active");
      document
        .getElementById(questionList[counter]["questionNum"])
        .classList.add("active");
    }
  };
  backButton.onclick = () => {
    handleAnswers(questionList);
    if (counter === 0) {
    } else {
      counter -= 1;
      document
        .getElementById(questionList[counter + 1]["questionNum"])
        .classList.remove("active");
      document
        .getElementById(questionList[counter]["questionNum"])
        .classList.add("active");
    }
  };
};

handleResultView = (list) => {
  const resultParent = document.getElementById("resultParent");
  resultParent.insertAdjacentHTML(
    "beforeend",
    `
  <h1 class="fw-bold mb-5">Result</h1>
  `
  );
  list.forEach((item) => {
    var result = `
    <div>
      <h5 id="question">${item["questionNum"]}. ${item["questionText"]}</h5>
      <div id="answer">${item["userInput"]}</div>
      <h3 class="text-success">${item["point"]}</h3>
    </div>
    `;
    resultParent.insertAdjacentHTML("beforeend", result);
  });
};

handleView = (questionNum, questionText, answerInput, correctAnswer) => {
  const parentSection = document.getElementById("parentSection");
  var questionanswer = `
  <div class="carousel-item" id=${questionNum}>
    <h3 id="question">${questionNum}. ${questionText}</h3>
    <p class="text-secondary">Correct answer is: ${correctAnswer}</p>
    <div class="my-3" id="answer">${answerInput}</div>
  </div>
  `;
  parentSection.insertAdjacentHTML("beforeend", questionanswer);
};

handleAnswers = (x) => {
  x.forEach((item) => {
    const questionNum = item["questionNum"];
    const questionText = item["questionText"];
    const answerType = item["answerType"];

    const answer = document.getElementById(questionNum + "quiz").value;
    console.log(answer);
    if (answer) {
      item["userInput"] = answer;
    } else {
      item["userInput"] = "No Answer";
    }
  });
  handleResults(x);
};

handleResults = (x) => {
  x.forEach((item) => {
    if (item["userInput"] === item["correctAnswer"]) {
      item["point"] = 1;
    } else {
      item["point"] = 0;
    }
  });
  console.log(x);
  handleLocalStorage(x);
};

handleLocalStorage = (x) => {
  window.localStorage.setItem("Results", JSON.stringify(x));
};
