'use client';

import React, { useState, useEffect } from 'react';

export default function RandomQuiz() {
  const [quizData, setQuizData] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [result, setResult] = useState(null);

  const fetchQuiz = async () => {
    setQuizData(null); // Reset quiz data
    const response = await fetch('http://127.0.0.1:8000/random-quiz');
    const data = await response.json();
    console.log("Received Quiz: ", data);
    setQuizData(data);
    setSelectedChoice(''); // Reset selected choice
    setResult(null); // Reset result
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleChoiceChange = (choice) => {
    setSelectedChoice(choice);

    // Trigger the result as soon as the radio button is selected
    if (choice === quizData.answer) {
      setResult({ message: 'Correct!', explanation: quizData.explanation });
    } else {
      setResult({ message: 'Incorrect!', explanation: quizData.explanation });
    }
  };

  if (!quizData) return (
  <div><div className="text-2xl text-primary">Random Quiz</div><div>Retrieving question...</div></div>
);

  return (
    <div className="flex flex-col min-h-full">
      <div className="grow">
        <div className="text-2xl text-primary">Random Quiz</div>
        <h2 className="text-xl pb-3">{quizData.question}</h2>
        <form>
          {quizData.choices.map((choice, index) => (
            <div key={index}>
              <input
                type="radio"
                name="quiz"
                checked={selectedChoice === choice}
                onChange={() => handleChoiceChange(choice)}
              />
              <label className="px-3 text-lg">{choice}</label>
            </div>
          ))}
        </form>
        {result && (
          <div className="pt-3">
            <p className={`font-black text-lg ${selectedChoice === quizData.answer ? "text-positive" : "text-negative"}`}>{result.message}</p>
            <p className="text-lg">{selectedChoice === quizData.answer && result.explanation}</p>
          </div>
        )}
      </div>

      <div className="text-right">
        <button onClick={fetchQuiz}>{`Next Question >`}</button>
      </div>
    </div>
  );
}