import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";

export const tasksReducer = (state: TasksStateType, action: TsarType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(s => s.id != action.id)
            }
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
                    ...m,
                    title: action.newTitle
                } : m)
            }
        case "ADD-EMPTY-TASK":
            return {
                ...state,
                [action.todolistID]:[]
            }
        default:
            return state
    }
}
type TsarType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | addEmptyTaskACType
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type addEmptyTaskACType = ReturnType<typeof addEmptyTasksAC>

export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: "REMOVE-TASK",
        id,
        todolistID
    } as const

}
export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: "ADD-TASK",
        title,
        todolistID
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        id,
        isDone,
        todolistId
    } as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        newTitle,
        todolistId
    } as const
}
export const addEmptyTasksAC = (todolistID:string)=>{
    return {
        type: 'ADD-EMPTY-TASK',
        todolistID
    } as const
}