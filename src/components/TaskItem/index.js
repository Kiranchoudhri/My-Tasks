import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {id, inputText, category} = taskDetails

  return (
    <li className="taskItemContainer">
      <p className="taskName">{inputText}</p>
      <p className="taskCategory">{category}</p>
    </li>
  )
}

export default TaskItem
