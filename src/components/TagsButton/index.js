import './index.css'

const TagsButton = props => {
  const {buttonDetails, onClickFilterTasks, tasksList} = props
  const {optionId, displayText} = buttonDetails

  const filterBtn = tasksList.filter(eachTask => eachTask.category === optionId)
  const activeClass = filterBtn.length && filterBtn[0].isActive && 'activeBtn'

  console.log('class', activeClass)

  const filterTasks = () => {
    onClickFilterTasks(optionId)
  }

  return (
    <li className="tagsButtonContainer">
      <button
        className={`tagsButton ${activeClass}`}
        type="button"
        onClick={filterTasks}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagsButton
