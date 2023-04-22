import { nanoid } from "nanoid";
import { useState } from "react";

function Question({ question, options }) {
  const question_with_entity = question;
  const decoded_question = { __html: question_with_entity };
  const [isClicked, setIsClicked] = useState(null);

  function handleClick(id) {
    console.log(id);
    setIsClicked(id);
  }

  return (
    <section>
      <p className="questions" dangerouslySetInnerHTML={decoded_question}></p>
      <div className="options">
        {options.map((option, index) => {
          return (
            <span
              key={index}
              onClick={() => handleClick(index)}
              className={isClicked === index ? "answer_clicked" : "answer"}
            >
              {option}
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default Question;
