import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryList = document.querySelector('.gallery');

const markup = galleryItems.reduce((acc, {
    preview,
    original,
    description
}) => acc + `
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`, '');

galleryList.insertAdjacentHTML('beforeend', markup);

galleryList.addEventListener('click', onImgClick);

function onImgClick(evt) {
  evt.preventDefault();
  
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const imgOriginal = `<img src="${evt.target.dataset.source}" alt="${evt.target.alt}">`;
  
  const instance = basicLightbox.create(imgOriginal,
    {
      onShow: (instance) => {
        document.addEventListener('keydown', onEscapeKeyDown);
      },
      onClose: (instance) => {
        document.removeEventListener('keydown', onEscapeKeyDown);
      },
    });
  
  instance.show();

  function onEscapeKeyDown(evt) {
    if (evt.code !== 'Escape') {
      return;
    }
    instance.close();
  }
};