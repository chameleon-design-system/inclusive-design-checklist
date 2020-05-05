import React from "react"

export default ({
  question,
  setOptionSelected,
  handleNextQuestion,
  handlePreviousQuestion,
  optionSelected,
}) => {
  return (
    <>
      <h2 className="checklist__question">{question.question}</h2>
      <div className="radio-container">
        <div className="radio-group">
          <input
            type="radio"
            id="yes"
            name="question-answer"
            value="yes"
            onChange={() => setOptionSelected(true)}
          />
          <label tabindex="0" htmlFor="yes">
            Yes
          </label>
        </div>
        <div className="radio-group">
          <input
            type="radio"
            id="no"
            name="question-answer"
            value="no"
            onChange={() => setOptionSelected(true)}
          />
          <label htmlFor="no">No</label>
        </div>
      </div>
      <div className="button-container">
        <button
          className="button-back"
          onClick={() => handlePreviousQuestion()}
        >
          Back
        </button>
        <button disabled={!optionSelected} onClick={() => handleNextQuestion()}>
          Next
        </button>
      </div>
    </>
  )
}
