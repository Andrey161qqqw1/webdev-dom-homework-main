import { loginTodos } from "./api.js";
import { format } from "date-fns";
import _ from 'lodash';

let token = '';
let arr = [];
export { arr }
export function renderAndLogin({ info, addFormName, formLoginValue }) {
    const comments = document.querySelector('.comments')
    const loginForm = document.querySelector('.form_login');
    const addLoginButton = document.querySelector('.add-login-button');
    const removeForLogin = document.querySelector('.remove-for-login');
    const formInputPassword = document.querySelector('.form_login_password');
    const formInputLogin = document.querySelector('.form_login_login');
    if (!token) {
        loginForm.style.display = 'block';
        removeForLogin.style.display = 'none';
        addLoginButton.addEventListener('click', function forToken() {
          removeForLogin.style.display = 'block';
          loginForm.style.display = 'none';
          
          loginTodos({ 
            login: formInputLogin.value, 
            password: formInputPassword.value,
            name: _.capitalize(name),
          }).then((user) => {
            token = `Bearer ${user.user.token}`
            arr.push(token);
            addFormName.value = user.user.name;
            addFormName.disabled = "disabled";
          })
      });
    } 
  const infoHtml = info.map((comment) => {
    const nowDate = comment.date;
    const createDate = format(nowDate, "yyyy-MM-dd HH:mm:ss");
    return `<li class="comment">
      <div class="comment-header">
        <div class="name_people">${comment.name}</div>
        <div>${createDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`
  }).join("");

  comments.innerHTML = infoHtml;
}

