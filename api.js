import { getCommentsData, renderComment } from "./main.js";
import { arr } from "./render.js";

export function getTodos({ host, downloadGet, info }) {
    return fetch(host,
        {
          method: "GET",
        }).then((response) => {
          if (response.status === 500) {
            alert('Произошла ошибка сервера, попробуйте позже');
            throw new Error('Произошла ошибка сервера, попробуйте позже');
          } 
          const JsonResponse = response.json();
      JsonResponse.then((responseData => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date),
            text: comment.text,
            likes: comment.likes,
          };
        })
        info = appComments;
          return renderComment({ info });
      }))
      .then(() => {
        return downloadGet.style.display = 'none';
      }).catch((error) => {
        downloadGet.textContent = 'Кажется что то пошло не так, попробуйте позже';
        console.warn(error);
      })
    })
}

export function postTodos({ host, addFormText, addFormName, token, download, removeDiv }) {
  JSON.stringify(arr)
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({text: addFormText.value, name: addFormName.value,}),
    headers: {
        Authorization: arr[0],
      }
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    } 
    if (response.status === 400) {
      alert('Недостаточно символов, введите корректное имя и комментарий, от трех символов')
      throw new Error('Недостаточно символов');
    }
    if (response.status === 500) {
      alert('Произошла ошибка сервера, попробуйте позже');
      throw new Error('Произошла ошибка сервера, попробуйте позже');
    } 
    else {
      alert('Упс, что то пошло не так');
      throw new Error('Упс, что то пошло не так');
    }
  })
  .then(() => {
      return getCommentsData();
  }).then(() => {
    download.style.display = 'none';
    removeDiv.classList.remove('delete-div');
  }).catch((error) => {
    download.style.display = 'none';
    removeDiv.classList.remove('delete-div');
    console.warn(error);
  })
}

export function loginTodos({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      alert('Введите верный логин или пароль')
      throw new Error('Введите верный логин или пароль')
    }
    if (response.status === 500) {
      alert('Произошла ошибка сервера, попробуйте позже');
      throw new Error('Произошла ошибка сервера, попробуйте позже');
    } else {
      return response.json();
    }
  })
}