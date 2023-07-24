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
        options: shuffledOptions.map((option, optionIndex) => ({
          option,
          id: optionIndex,
        })),
        correct_answer: question.correct_answer,
      };
    });
  }, [questions]);

  function handleOptionClick(questionIndex, optionIndex) {
    console.log({ questionIndex, optionIndex });
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

  console.log(questions, newQuestions, selectedOptions);
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
          newQuestions.map((optionGroup, questionIndex) => {
            const { decoded_question, options, correct_answer } = optionGroup;
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
                    return (
                      <span
                        key={id}
                        className={`answer`}
                        onClick={() =>
                          handleOptionClick(questionIndex, optionIndex)
                        }
                        style={
                          selectedOptionIndex === optionIndex
                            ? { backgroundColor: "#d6dbf5", border: "none" }
                            : {}
                        }
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
            <button className="replay">Play again</button>
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
