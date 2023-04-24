import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import { ReactComponent as TopBlob } from "../../src/icons/top-blop.svg";
import { ReactComponent as BottomBlob } from "../../src/icons/bottom-blob.svg";
import { nanoid } from "nanoid";

function Quiz() {
  const dataFetchedRef = useRef(false);
  const [questions, setQuestions] = useState("");
  const [newQuestions, setNewQuestions] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [correctAnswers, setCorrectAnswers] = useState(0);

  const getQuestionsData = () => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
      )
      .then((data) => setQuestions(data.data.results))
      .catch((error) => console.log(error));
  };

  function handleAnswer(currentSelection) {
    const index = selectedOptions.findIndex(
      (options) => options.questionId === currentSelection.questionId
    );
    if (index !== -1) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[index] = currentSelection;
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions((prevSelection) => [
        ...prevSelection,
        currentSelection,
      ]);
    }
    
  }
  console.log(selectedOptions);
  function handleCheckClick(answerArray) {
    console.log(answerArray);
    let questionsGotten = 0;
    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i].answer === answerArray[i].choice) {
        questionsGotten += 1;
      }
    }
    console.log(questionsGotten);
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getQuestionsData();
  }, []);

  useEffect(() => {
    if (!questions) return;

    const questionsWithOptions = questions.map((question) => ({
      ...question,
      questionId: nanoid(),
      options: [...question.incorrect_answers, question.correct_answer]
        .sort(() => Math.random() - 0.5)
        .map((option) => ({ option: option, id: nanoid() })),
    }));
    setNewQuestions(questionsWithOptions);
  }, [questions]);
  console.log(newQuestions);

  return (
    <div>
      <div className="other_page_top_blob">
        <TopBlob />
      </div>

      <div className="container">
        {newQuestions &&
          newQuestions.map((question, index) => {
            return (
              <Question
                key={index}
                question={question.question}
                questionId={question.questionId}
                options={question.options}
                onAnswer={handleAnswer}
                correctAnswer={question.correct_answer}
              />
            );
          })}
      </div>
      <div className="check_answers">
        <button onClick={() => handleCheckClick(selectedOptions)}>
          Check answers
        </button>
      </div>

      <div className="other_page_bottom_blob">
        <BottomBlob />
      </div>
    </div>
  );
}

export default Quiz;
