import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import TagsButton from '../TagsButton'
import TaskItem from '../TaskItem'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isActive: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isActive: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isActive: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isActive: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isActive: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isActive: false,
  },
]

class Task extends Component {
  state = {
    tasksList: [],
    inputText: '',
    category: tagsList[0].optionId,
  }

  onChangeInput = e => {
    this.setState({inputText: e.target.value})
  }

  onChangeOption = e => {
    this.setState({category: e.target.value})
  }

  addTask = e => {
    e.preventDefault()
    const {inputText, category} = this.state
    const newTask = {
      id: uuidv4(),
      inputText,
      category,
      isActive: false,
    }
    if (inputText.length) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        inputText: '',
        category: tagsList[0].optionId,
      }))
    }
  }

  onClickFilterTasks = id => {
    this.setState(prevState => ({
      tasksList: prevState.tasksList.map(eachTask => {
        if (id === eachTask.category) {
          return {...eachTask, isActive: !eachTask.isActive}
        }
        return {...eachTask, isActive: false}
      }),
    }))
  }

  render() {
    const {inputText, tasksList, category} = this.state
    console.log('state', tasksList)
    const filteredList = tasksList.filter(eachTask => eachTask.isActive)

    const dynamicArray = filteredList.length ? filteredList : tasksList

    return (
      <div className="mainPage">
        <div className="createTaskSection">
          <h1 className="taskFormHeading">Create a task!</h1>
          <div className="formContainer">
            <form className="formElement" onSubmit={this.addTask}>
              <div className="taskInputSection">
                <label className="inputLabel" htmlFor="task">
                  Task
                </label>
                <input
                  className="inputElement"
                  placeholder="Enter the task here"
                  type="text"
                  id="task"
                  onChange={this.onChangeInput}
                  value={inputText}
                />
              </div>
              <div className="taskInputSection">
                <label className="inputLabel" htmlFor="tags">
                  Tags
                </label>
                <select
                  className="selectElement"
                  id="tags"
                  name="categoryTags"
                  onChange={this.onChangeOption}
                >
                  {tagsList.map(eachTag => (
                    <option
                      key={eachTag.optionId}
                      value={eachTag.optionId}
                      className="tagOptions"
                    >
                      {eachTag.displayText}
                    </option>
                  ))}
                </select>
                <div className="buttonContainer">
                  <button type="submit" className="addTaskBtn">
                    Add Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="taskHistorySection">
          <h1 className="tagsHistoryHeading">Tags</h1>
          <ul className="tagsButtonList">
            {tagsList.map(eachTag => (
              <TagsButton
                key={eachTag.optionId}
                buttonDetails={eachTag}
                tasksList={tasksList}
                onClickFilterTasks={this.onClickFilterTasks}
              />
            ))}
          </ul>
          <h1 className="tagsHistoryHeading">Tasks</h1>
          <ul className="tasksList">
            {tasksList.length !== 0 ? (
              dynamicArray.map(eachTag => (
                <TaskItem id={eachTag.id} taskDetails={eachTag} />
              ))
            ) : (
              <div className="noTasksContainer">
                <p className="noTasks">No Tasks Added Yet</p>
              </div>
            )}
          </ul>
          )
        </div>
      </div>
    )
  }
}

export default Task
