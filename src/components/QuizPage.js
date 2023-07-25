import React, { useState, useMemo } from "react";
import { ReactComponent as TopBlob } from "../../src/icons/top-blop.svg";
import { ReactComponent as BottomBlob } from "../../src/icons/bottom-blob.svg";
import { useQuestions } from "../useQuestion";

function QuizPage() {
  const { isLoading: isLoadingQuestions, data } = useQuestions();
  const questions = data?.data.results;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const newQuestions = useMemo(() => {
    return questions?.map((question) => {
      let decoded_question = { __html: question.question };
      let shuffledOptions = [
        ...question.incorrect_answers,
        question.correct_answer,
      ].sort(() => Math.random() - 0.5);
      return {
        decoded_question,
        correct_answer: question.correct_answer,
        options: shuffledOptions.map((option, optionIndex) => ({
          option,
          id: optionIndex,
        })),
      };
    });
  }, [questions]);

  function handleOptionClick(questionIndex, optionIndex) {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: optionIndex,
    }));
  }

  function handleButtonClick() {
    setButtonClicked(true);
    let totalScore = 0;
    for (const questionIndex in selectedOptions) {
      let currentQuestion = newQuestions[questionIndex];
      if (
        currentQuestion.correct_answer ===
        currentQuestion.options[selectedOptions[questionIndex]].option
      ) {
        totalScore++;
      }
    }
    setTotalScore(totalScore);
  }

  return (
    <div>
      <div className="other_page_top_blob">
        <TopBlob />
      </div>
      {isLoadingQuestions && (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className="container">
        {!isLoadingQuestions &&
          newQuestions?.map((optionGroup, questionIndex) => {
            const { decoded_question, correct_answer, options } = optionGroup;
            const selectedOptionIndex = selectedOptions[questionIndex];
            return (
              <section key={questionIndex}>
                <p
                  className="questions"
                  dangerouslySetInnerHTML={decoded_question}
                ></p>
                <div>
                  {options.map((option, optionIndex) => {
                    const { option: optionText, id } = option;
                    let optionStyle = {};
                    if (!isButtonClicked) {
                      if (selectedOptionIndex === optionIndex) {
                        optionStyle = {
                          backgroundColor: "#d6dbf5",
                          border: "none",
                        };
                      } else {
                        optionStyle = {};
                      }
                    } else {
                      if (optionText === correct_answer) {
                        optionStyle = {
                          backgroundColor: "#94D7A2",
                          border: "none",
                        };
                      } else if (
                        selectedOptionIndex === optionIndex &&
                        optionText !== correct_answer
                      ) {
                        optionStyle = {
                          backgroundColor: "#F8BCBC",
                          border: "none",
                          opacity: "0.5",
                        };
                      } else {
                        optionStyle = { opacity: "0.5" };
                      }
                    }
                    return (
                      <span
                        key={id}
                        className="answer"
                        onClick={() =>
                          handleOptionClick(questionIndex, optionIndex)
                        }
                        style={optionStyle}
                      >
                        {optionText}
                      </span>
                    );
                  })}
                </div>
              </section>
            );
          })}
        {!isLoadingQuestions && !isButtonClicked && (
          <div className="check_answers">
            <button onClick={handleButtonClick}>Check answers</button>
          </div>
        )}
        {!isLoadingQuestions && isButtonClicked && (
          <div className="ans_and_replay">
            <p className="total_answers">
              You scored {totalScore} / {5} correct answers
            </p>
            <button
              className="replay"
              onClick={() => window.location.reload(false)}
            >
              Play again
            </button>
          </div>
        )}
      </div>
      <div className="other_page_bottom_blob">
        <BottomBlob />
      </div>
    </div>
  );
}

export default QuizPage;
