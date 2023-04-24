import { useState } from "react";

function Question({ question, options, onAnswer, correctAnswer, questionId }) {
  const question_with_entity = question;
  const decoded_question = { __html: question_with_entity };
  const [selectedOption, setSelectedOption] = useState(null);
  // const [allSelectedOption, setAllSelectedOption] = useState(null);

  function handleOptionClick(option, questionId) {
    console.log(option, questionId);
    setSelectedOption(option.id);
    onAnswer({answer: correctAnswer, choice: option.option, questionId: questionId})
  }

  return (
    <section>
      <p className="questions" dangerouslySetInnerHTML={decoded_question}></p>
      <div className="options">
        {options.map((option) => {
          return (
            <span
              key={option.id}
              onClick={() => handleOptionClick(option, questionId)}
              className={
                selectedOption === option.id ? "answer_clicked" : "answer"
              }
            >
              {option.option}
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default Question;
