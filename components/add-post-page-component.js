import { renderHeaderComponent } from "./header-component.js";
export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="header-container"></div>
    <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
  <div class="upload=image">
      
            <label class="file-upload-label secondary-button">
                <input type="file" class="input-file file-upload-input" style="display:none">
                Выберите фото
            </label>
          
      
  </div>
</div>
          <label>
            Опишите фотографию:
            <textarea class="input-text input textarea" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
  `;

    appEl.innerHTML = appHtml;
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    document.getElementById("add-button").addEventListener("click", () => {
      const fileInputElement = document.querySelector('.input-file');
      postImage({ file: fileInputElement.files[0] });

      function postImage({ file }) {
        const data = new FormData();
        data.append("file", file);

        return fetch('https://webdev-hw-api.vercel.app/api/upload/image', {
          method: "POST",
          body: data,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const inputText = document.querySelector('.input-text');
            onAddPostClick({
              description: inputText.value,
              imageUrl: data.fileUrl,
            });
          });
      }
    });
  };
  render();
}
