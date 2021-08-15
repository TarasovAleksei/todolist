import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistReducer = (state: TodolistType[], action: TsarType):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id != action.id)]
        case "ADD-TODOLIST":
            return [...state,
                {id: action.todolistID, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(s => s.id === action.id ? {...s, title: action.title} : s)
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(s => s.id === action.id ? {...s, filter: action.filter} : s)]
        default:
            return state
    }
}
type TsarType = removeTodolistACType | addTodoListACType | changeTodolistTitleACType | changeTodolistFilterACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id
    } as const
}
type addTodoListACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistID
    } as const
}
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}