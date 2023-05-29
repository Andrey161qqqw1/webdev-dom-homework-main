let info = [];
const addFormName = document.querySelector('.add-form-name');
const addFormText = document.querySelector('.add-form-text');
const downloadGet = document.querySelector('.download-GET');
function getCommentsData() {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/MnogoYje/comments",
{
  method: "GET",
}).then((response) => { response.json().then((responseData => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        Iliked: false,
      };
    })
    info = appComments;
      return renderComment();
      likesCounter();
      commentAndNameCopy();
  }))
  .then((response) => {
    return console.log(response);
    if (response.status === 200) {
      return response.json();
    } 
    if (response.status === 500) {
      alert('Произошла ошибка сервера, попробуйте позже');
      throw new Error('Произошла ошибка сервера, попробуйте позже');
    } else {
      throw new Error('Подождите,что то пошло не по плану');
    }
  })
  .then(() => {
    return downloadGet.style.display = 'none';
  }).catch((error) => {
    downloadGet.textContent = 'Кажется что то пошло не так, попробуйте позже';
    console.warn(error);
  })
})
}


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

const comments = document.querySelector('.comments')
const renderComment = () => {
    const infoHtml = info.map((comment) => {
        let dates = '';
        const day = ('0' + comment.date.getDate()).slice(-2);
        const month = ('0' + (comment.date.getMonth() + 1)).slice(-2);
        const year = comment.date.getFullYear().toString().slice(-2);
        const hours = ('0' + comment.date.getHours()).slice(-2);
        const minutes = ('0' + comment.date.getMinutes()).slice(-2);
        dates = `${day}.${month}.${year} ${hours}:${minutes}`;
      
        return `<li class="comment">
        <div class="comment-header">
          <div class="name_people">${comment.name}</div>
          <div>${dates}</div>
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
    likesCounter();
    commentAndNameCopy();
  }
  const button = document.querySelector('.add-form-button');
  
  function buttonClick() {
    const download = document.querySelector('.download');
    const deleteDiv = document.querySelector('.delete-div');
    const removeDiv = document.querySelector('.remove-div');
    button.addEventListener('click', function(event) {
        download.style.display = 'block';
        removeDiv.classList.add('delete-div');
        return fetch("https://webdev-hw-api.vercel.app/api/v1/MnogoYje/comments", {
        method: "POST",
        body: JSON.stringify({text: addFormText.value, name: addFormName.value,}),
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
          return getCommentsData()
          renderComment();
          likesCounter();
          commentAndNameCopy();
      }).then(() => {
        download.style.display = 'none';
        removeDiv.classList.remove('delete-div');
      }).catch((error) => {
        download.style.display = 'none';
        removeDiv.classList.remove('delete-div');
        console.warn(error);
      })
    });
  } 

export { getCommentsData, renderComment, buttonClick, likesCounter, commentAndNameCopy };