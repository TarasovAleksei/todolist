import React, {useState} from 'react';
import './App.css';
import TodoList from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

const App = () => {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "C++", isDone: false},
        {id: v1(), title: "Python", isDone: false},
    ])
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }
    const changeTaskStatus = (taskId: string, isDone:boolean) => {
        // const updatedTasks = tasks.map(t=> {
        //     if(t.id===taskId){
        //         return {...t, isDone: isDone}
        //     }
        //     return t
        // })
        // let task = tasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone
        // }
        // let copyTask = [...tasks]

        // setTasks(updatedTasks)
        setTasks(tasks.map(t=>t.id===taskId?{...t,isDone}: t))
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let TasksForRender = tasks
    if (filter === 'completed') {
        TasksForRender = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        TasksForRender = tasks.filter(t => !t.isDone)
    }
    const changeFilter = (newFilter: FilterValuesType) => {
        setFilter(newFilter)
    }
    return (
        <div className="App">
            <TodoList
                filter={filter}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeFilter={changeFilter}
                titleValue={'What to learn'}
                tasks={TasksForRender}/>
        </div>
    );
}

export default App;
