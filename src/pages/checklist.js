import React, { useState } from "react"
import {
  SelectChecklistType,
  Layout,
  Progress,
  ChecklistItem,
} from "../components"
import { guidelines } from "../data/guidelines"

const ChecklistPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)
  const [checklistQuestions, setChecklistQuestions] = useState(null)
  const [optionSelected, setOptionSelected] = useState(false)
  const [checklistGuidelines, setChecklistGuidelines] = useState([])
  const [progress, setProgress] = useState(0)

  const handleNextQuestion = () => {
    if (currentQuestionIndex === -1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setOptionSelected(false)
      return
    }
    const guidelineSelected = document.querySelector("#yes").checked
    // Add guideline to the list of guidelines
    if (guidelineSelected) {
      const guidelines = checklistQuestions[currentQuestionIndex].guidelines

      checklistQuestions[currentQuestionIndex].addToChecklist = true
      setChecklistGuidelines([...checklistGuidelines, ...guidelines])
    } else {
      // Remove the guideline if it was previously selected but is no longer
      const guidelines = checklistQuestions[currentQuestionIndex].guidelines
      if (checklistGuidelines.includes(guidelines[0])) {
        const filteredGuidelines = checklistGuidelines.filter(
          guideline => !guidelines.includes(guideline)
        )
        checklistQuestions[currentQuestionIndex].addToChecklist = false
        setChecklistGuidelines(filteredGuidelines)
      }
    }
    if (currentQuestionIndex + 1 < checklistQuestions.length) {
      if (checklistQuestions[currentQuestionIndex + 1].visited === true) {
        if (
          // If the question was previously selected, set that value
          checklistQuestions[currentQuestionIndex + 1].addToChecklist === true
        ) {
          document.querySelector("#yes").checked = true
        } else {
          document.querySelector("#no").checked = true
        }
        setOptionSelected(true)
      } else {
        // Reset the options to be unselected
        document.querySelector("#yes").checked = false
        document.querySelector("#no").checked = false
        setOptionSelected(false)
      }
    }
    checklistQuestions[currentQuestionIndex].visited = true

    setProgress(
      Math.floor(((currentQuestionIndex + 1) / checklistQuestions.length) * 100)
    )
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex - 1 >= 0) {
      if (
        checklistQuestions[currentQuestionIndex - 1].addToChecklist === true
      ) {
        document.querySelector("#yes").checked = true
      } else {
        document.querySelector("#no").checked = true
      }
      setOptionSelected(true)
    }
    setProgress(
      Math.floor(((currentQuestionIndex - 1) / checklistQuestions.length) * 100)
    )
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  if (currentQuestionIndex === -1) {
    return (
      <Layout>
        <Progress progress={progress} />
        <SelectChecklistType
          setChecklistQuestions={setChecklistQuestions}
          setOptionSelected={setOptionSelected}
          setChecklistGuidelines={setChecklistGuidelines}
        />
        <div className="button-container">
          <button
            disabled={!optionSelected}
            onClick={() => handleNextQuestion()}
          >
            Next
          </button>
        </div>
      </Layout>
    )
  } else if (currentQuestionIndex === checklistQuestions.length) {
    const uniqueGuidelines = [...new Set(checklistGuidelines)]
    return (
      <Layout>
        <Progress progress={progress} />
        <button className="button--print" onClick={() => window.print()}>
          Print
        </button>
        {uniqueGuidelines.map(guideline => (
          <ChecklistItem
            guideline={guideline}
            guidelineParams={guidelines[guideline]}
            key={guideline}
          />
        ))}
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Progress progress={progress} />
        <h2 className="checklist__question">
          {checklistQuestions[currentQuestionIndex].question}
        </h2>
        <div className="radio-container">
          <div className="radio-group">
            <input
              type="radio"
              id="yes"
              name="question-answer"
              value="yes"
              onChange={() => setOptionSelected(true)}
            />
            <label htmlFor="yes">Yes</label>
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
            className="button--back"
            onClick={() => handlePreviousQuestion()}
          >
            Back
          </button>
          <button
            disabled={!optionSelected}
            onClick={() => handleNextQuestion()}
          >
            Next
          </button>
        </div>
      </Layout>
    )
  }
}

export default ChecklistPage
