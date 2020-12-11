import React from "react"
import newPage from "../images/new-page.svg"

export const ChecklistItem = ({ guideline, guidelineParams }) => {
  const { 
    link, title, goal, solution, impact, design, writing, engineering, 
    acceptance 
  } = guidelineParams

  let acRef = React.createRef();

  const copyToClipboard = async (criteriaRef) => {
    // Clipboard API not available
    if (!navigator.clipboard) return
    const text = criteriaRef.current.innerText;
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <div className="checklist-item-wrapper" key={link}>
      <div className="checklist-title-wrapper">
        <label className="container">
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <h1>{title}</h1>
      </div>
      <h2 className="checklist-goal">Goal</h2>
      <p>{goal}</p>
      
      <h2>Acceptance Criteria</h2>
      {acceptance ? 
        <>
          <p ref={acRef}>{acceptance}</p>
          <button type="button" className="checklist-item__copy-button" onClick={()=>copyToClipboard(acRef)}>
            Copy Criteria
          </button>
        </>
        :
        <p>Not available</p>
      }
      <h2>Solution</h2>
      <p>{solution}</p>
      <h2>Roles Involved</h2>
      <div className="checklist-item__roles">
      {design && <span className="checklist-item__roles__job">Design</span>}
      {writing && <span className="checklist-item__roles__job">Writing</span>}
      {engineering && <span className="checklist-item__roles__job">Engineering</span>}
      </div>
      <a
        href={link}
        className="guideline-badge"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="guideline-badge-icon">
          <img
            src={newPage}
            aria-hidden="true"
            alt="Open guideline in a new page"
          />
        </span>
        Guideline {guideline} - {title}
        <span className={`impact impact--${impact.toLowerCase()}`}>
          {impact}
        </span>
      </a>
    </div>
  )
}
