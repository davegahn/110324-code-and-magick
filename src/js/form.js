'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container'), // див в котором форма
    formCloseButton = document.querySelector('.review-form-close'), // кнопка закрытия
    formRequired = document.querySelector('.review-form'), // форма
    submitButton = document.querySelector('.review-submit'), // кнопка
    requiredText = document.getElementById('review-text'),  // требуемое поле Отзыв
    requiredName = document.getElementById('review-name'), // требуемое поле Имя
    hidingBlock = document.querySelector('.review-fields'),
    inputsGroup = document.querySelector('.review-form-group'), // группа звездочек
    hidingName = document.querySelector('.review-fields-name'), // скрываемое имя
    hidingTstml = document.querySelector('.review-fields-text');//скрываемый отзыв

  submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена

  function validate() {
    requiredText.required = Number(formRequired['review-mark'].value) < 3;
    if (requiredText.required) {
      if (requiredName.value !== '' && requiredText.value === '') {
        hidingBlock.classList.remove('invisible'); // показываем блок
        hidingTstml.classList.remove('invisible'); // показываем лейбл "отзыв"
        hidingName.classList.add('invisible'); // скрываем лейбл "имя"
        submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена
      } else if (requiredName.value === '' && requiredText.value !== '') {
        hidingBlock.classList.remove('invisible'); // показываем блок
        hidingName.classList.remove('invisible'); // покажем лейбл "имя"
        hidingTstml.classList.add('invisible'); // скрываем лейбл "отзыв"
        submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена
      } else if (requiredName.value === '' && requiredText.value === '') {
        hidingBlock.classList.remove('invisible'); // показываем блок
        hidingName.classList.remove('invisible'); // покажем лейбл "имя"
        hidingTstml.classList.remove('invisible'); // показываем лейбл "отзыв"
        submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена
      } else if (requiredName.value !== '' && requiredText.value !== '') {
        hidingBlock.classList.add('invisible'); // скрываем блок
        submitButton.removeAttribute('disabled'); // активируем кнопку
      }
    } else {
      if(requiredName.value !== '' && requiredText.value === '') {
        hidingBlock.classList.add('invisible'); // скрываем блок
        submitButton.removeAttribute('disabled'); // активируем кнопку
      } else if (requiredName.value === '' && requiredText.value !== '') {
        hidingBlock.classList.remove('invisible'); // показываем блок
        hidingName.classList.remove('invisible'); // покажем лейбл "имя"
        hidingTstml.classList.add('invisible'); // скрываем лейбл "отзыв"
        submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена
      } else if (requiredName.value === '' && requiredText.value === '') {
        hidingBlock.classList.remove('invisible'); // показываем блок
        hidingName.classList.remove('invisible'); // покажем лейбл "имя"
        hidingTstml.classList.add('invisible'); // скрываем лейбл "отзыв"
        submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена
      } else if (requiredName.value !== '' && requiredText.value !== '') {
        hidingBlock.classList.add('invisible'); // скрываем блок
        submitButton.removeAttribute('disabled'); // активируем кнопку
      }
    }
  }

  inputsGroup.onchange = validate;
  requiredText.oninput = validate;
  requiredName.oninput = validate;

  validate();


  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
