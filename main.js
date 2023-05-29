import { getCommentsData, renderComment, buttonClick, likesCounter, commentAndNameCopy } from './commentData.js'
const container = document.querySelector('.container');
const addForm = document.querySelector('.add_form');
const comments = document.querySelector('.comments')
const addFormName = document.querySelector('.add-form-name');
const addFormText = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
const downloadGet = document.querySelector('.download-GET');


likesCounter();
getCommentsData()

let info = [];






renderComment();
likesCounter();
commentAndNameCopy();
buttonClick()
