import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import classes from './Todolist.module.css'

type TodoListPropTypes = {
    titleValue: string,
    tasks: Array<TaskType>,
    changeFilter: (newFilter: FilterValuesType) => void
    removeTask: (taskID: string) => void,
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

const TodoList: React.FC<TodoListPropTypes> = ({
                                                   titleValue,
                                                   tasks,
                                                   changeFilter,
                                                   removeTask,
                                                   addTask,
                                                   changeTaskStatus,
                                                   filter
                                               }) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onAddTask()
    }
    const onChangeFilterAll = () => {
        changeFilter('all')
    }
    const onChangeFilterActive = () => {
        changeFilter('active')
    }
    const onChangeFilterCompleted = () => {
        changeFilter('completed')
    }
    const onAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    const taskJSXElement = tasks.map(t => {
        const onRemoveTask = () => {
            removeTask(t.id)
        }
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, event.currentTarget.checked)
        }
        const classForTask = t.isDone ? classes.labelCheckboxIsDone : classes.labelCheckbox
        return (
            <div className={classes.containerForTasks} key={t.id}>
                <div className={classes.containerForTask}>
                    <input className={classes.inputCheckbox} id={t.id} onChange={onChangeHandler} type="checkbox"
                           checked={t.isDone}/>
                    <label className={classForTask} htmlFor={t.id}>
                        {t.title}
                    </label>
                    <button className={classes.btnDel} onClick={onRemoveTask}>x
                    </button>
                </div>

            </div>
        )
    })

    return (
        <div>
            <h3>{titleValue}</h3>
            <div>
                <input placeholder={'add your new task'} value={title} onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? classes.styleForInputError : classes.styleForInput}
                />
                <button className={classes.btnAdd} onClick={onAddTask}>+</button>
                <div className={classes.containerForError}>
                    {error && <div className={classes.errorMessage}>Field is empty</div>}
                </div>

            </div>
            <div>
                <button className={filter === 'all' ? classes.activeFilterBtn : classes.unActiveFilterBtn}
                        onClick={onChangeFilterAll}>All
                </button>
                <button className={filter === 'active' ? classes.activeFilterBtn : classes.unActiveFilterBtn}
                        onClick={onChangeFilterActive}>Active
                </button>
                <button className={filter === 'completed' ? classes.activeFilterBtn : classes.unActiveFilterBtn}
                        onClick={onChangeFilterCompleted}>Completed
                </button>
            </div>
            <div className={classes.containerForTasks}>
                {taskJSXElement}
            </div>

        </div>
    )
}
export default TodoList