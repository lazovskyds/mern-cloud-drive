const SET_FILES = 'SET_FILES';
const SET_CURRENT_FILES = 'SET_CURRENT_FILES';
const ADD_FILE = 'ADD_FILE';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const DELETE_FILE = 'DELETE_FILE';


const defaultState = {
    files: [],
    currentDir: null,
    dirStack: []
};

export default function fileReducer(state = defaultState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_FILES:
            return {...state, files: payload};
        case SET_CURRENT_FILES:
            return {...state, currentDir: payload};
        case ADD_FILE:
            return {...state, files: [...state.files, payload]};
        case PUSH_TO_STACK:
            return {...state, dirStack: [...state.dirStack, payload]};
        case DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file._id !== payload)]};
        default:
            return state;
    }
};

export const setFiles = (files) => ({type: SET_FILES, payload: files});
export const setCurrentDir = (dir) => ({type: SET_CURRENT_FILES, payload: dir});
export const addFile = (file) => ({type: ADD_FILE, payload: file});
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir});
export const deleteFileAction = (dirId) => ({type: DELETE_FILE, payload: dirId});