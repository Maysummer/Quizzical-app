import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import { ReactComponent as TopBlob } from "../../src/icons/top-blop.svg";
import { ReactComponent as BottomBlob } from "../../src/icons/bottom-blob.svg";

function Quiz() {
  const dataFetchedRef = useRef(false);
  const [questions, setQuestions] = useState("");

  const getQuestionsData = () => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
      )
      .then((data) => setQuestions(data.data.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getQuestionsData();
  }, []);

  return (
    <div>
      <div className="other_page_top_blob">
        <TopBlob />
      </div>

      <div className="container">
        {console.log(questions)}
        {questions &&
          questions.map((question, index) => {
            const options = [
              ...question.incorrect_answers,
              question.correct_answer
            ]
            console.log(options)
            return (
              <Question
                key={index}
                question={question.question}
                options={options}
              />
            );
          })}
      </div>
      <div className="check_answers">
        <button>Check answers</button>
      </div>

      <div className="other_page_bottom_blob">
        <BottomBlob />
      </div>
    </div>
  );
}

export default Quiz;
