import { getTodos, postTodos } from "./api.js";
import { renderAndLogin } from "./render.js";
import { format } from "date-fns";

const container = document.querySelector('.container');
const addFormName = document.querySelector('.add-form-name');
const addFormText = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
const downloadGet = document.querySelector('.download-GET');
const host = "https://webdev-hw-api.vercel.app/api/v2/MnogoYje/comments";
const formLoginValue = document.querySelector('.form_login_login');
let info = [];
export function getCommentsData() {
  return getTodos({ host, downloadGet, info })
}

getCommentsData()


function likesCounter() {
const likeButtons = document.querySelectorAll('.like-button');
const likes = document.querySelectorAll('.likes-counter');

likeButtons.forEach((likeButton, likeButtonId) => {
likeButton.onclick = function (event) {
  event.stopPropagation();
  if (likeButton.classList.contains('active-like')) {
    likeButton.classList.remove('active-like');
    likes[likeButtonId].innerHTML = +likes[likeButtonId].innerHTML - 1;
  } else {
    likeButton.classList.add('active-like')
    likes[likeButtonId].innerHTML = +likes[likeButtonId].innerHTML + 1;
  }
}
});
}

likesCounter();

export function renderComment({ info }) {
    renderAndLogin({ info, addFormName, formLoginValue });
    likesCounter();
    commentAndNameCopy();
}



function commentAndNameCopy() {
  const namePeoples = document.querySelectorAll('.name_people');
const commentTexts = document.querySelectorAll('.comment-text');
const commentsBlock = document.querySelectorAll('.comment');
commentsBlock.forEach((commentBlock, commentBlockId) => {
  commentBlock.addEventListener('click', function (event) {
    event.stopPropagation();
    addFormText.value = ('>' + commentTexts[commentBlockId].textContent + namePeoples[commentBlockId].textContent + ', ')
  })
});
}
renderComment({ info })
likesCounter();
commentAndNameCopy();

const download = document.querySelector('.download');
const deleteDiv = document.querySelector('.delete-div');
const removeDiv = document.querySelector('.remove-div');
button.addEventListener('click', function(event) {
    download.style.display = 'block';
    removeDiv.classList.add('delete-div');
    return postTodos({ host, addFormText, addFormName, download, removeDiv });
});