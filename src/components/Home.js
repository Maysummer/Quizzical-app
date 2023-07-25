import React, { useState } from "react";
import "../App.css";
import { ReactComponent as TopBlob } from "../../src/icons/top-blop.svg";
import { ReactComponent as BottomBlob } from "../../src/icons/bottom-blob.svg";
import QuizPage from "./QuizPage";

function Home() {
    const [startedQuiz, setStartedQuiz] = useState(false);

  function handleClick() {
    setStartedQuiz(true);
  }
    return (
      <div className="App">
        {!startedQuiz && (
          <>
            <div className="topBlob">
              <TopBlob />
            </div>
            <main>
              <p className="header">Quizzical</p>
              <p className="description">
                A couple of random questions you can answer
              </p>
              <button onClick={handleClick}>Start quiz</button>
            </main>
            <div className="downBlob">
              <BottomBlob />
            </div>
          </>
        )}

        {startedQuiz && (
          <div className="other_page">
            <QuizPage />
          </div>
        )}
      </div>
    );
}

export default Home;