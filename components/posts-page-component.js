import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { disLike, liker } from "../api.js";
import { correctDate } from "../helpers.js";

export function renderPostsPageComponent({ appEl }) {
  console.log("Актуальный список постов:", posts);

  const postsHtml = posts.map((post) => {
    return `<li class="post">
    <div class="post-header" data-user-id=${post.user.id}>
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
    </div>
    <div class="post-image-container">
      <img class="post-image" src="${post.imageUrl}">
    </div>
    <div class="post-likes">
      <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button">
      ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}
      </button>
      <p class="post-likes-text">
        Нравится: 
        <strong>${post.likes.length}</strong>
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${post.user.name}</span>
      ${post.description}
    </p>
    <p class="post-date">
    ${correctDate(post.createdAt)}
    </p>
  </li>`
  }).join('');

  const appHtml = `
        <div class="page-container">
          <div class="header-container"></div>
          <ul class="posts">
           ${postsHtml}
          </ul>
        </div>`;
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
  for (let userEl of document.querySelectorAll(".post-header")) {
    const postsHeaderHtml = posts.map((post) => {
      if (userEl.dataset.userId === post.user.id) {
        return `<div class="post-header" data-user-id=${post.user.id}>
      <img src="${post.user.imageUrl}" class="img-size">
      <p class="post-header__user-name header-size">${post.user.name}</p>
    </div>
    ` }
    }).join('');
    const postsUserHtml = posts.map((post) => {
      if (userEl.dataset.userId === post.user.id) {
        return `<li class="post">
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button">
        ${post.isLiked ? `<img src="./assets/images/like-active.svg">` : `<img src="./assets/images/like-not-active.svg">`}
        </button>
        <p class="post-likes-text">
          Нравится: 
          <strong>${post.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
      ${correctDate(post.createdAt)}
      </p>
    </li>`
      }
    }).join('');

    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });

      const appUserHtml = `
        <div class="page-container">
          <div class="header-container"></div>
          <ul class="posts">
            ${postsHeaderHtml}
           ${postsUserHtml}
          </ul>
        </div>`;
      appEl.innerHTML = appUserHtml;
      const head = document.querySelectorAll('.post-header');
      console.log(head.length);
      renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });
      if (head.length > 1) {
        for (let head1 of head) {
          head1.style.display = 'none';
          head[0].style.display = 'block';
          head[0].style.display = 'flex';
        }
      }
      const likeButtons = document.querySelectorAll('.like-button');
      likeButtons.forEach((like, like1) => {
        like.addEventListener('click', function (e) {
          e.preventDefault();
          if (posts[like1].isLiked === true) {
            disLike({ userPostId: like.dataset.postId });
          } else {
            liker({ userPostId: like.dataset.postId });
          }
        })
      });
    });
  }
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((like, like1) => {
    like.addEventListener('click', function (e) {
      e.preventDefault();
      if (posts[like1].isLiked === true) {
        disLike({ userPostId: like.dataset.postId });
      } else {
        liker({ userPostId: like.dataset.postId });
      }
    })
  });
}