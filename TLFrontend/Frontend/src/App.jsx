import { useState } from "react";

const ExamPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const question = "What is the capital of France?";
  const options = ["Paris", "London", "Berlin", "Madrid"];

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Exam Test</h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <label
                key={index}
                className={`block p-3 border rounded-lg cursor-pointer
                ${selectedAnswer === option ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}
                hover:bg-blue-50`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  className="mr-2"
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>

        {submitted && (
          <p className="mt-4 text-green-600 font-semibold text-center">
            You selected: {selectedAnswer}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
