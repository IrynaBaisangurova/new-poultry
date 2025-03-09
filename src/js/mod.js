import Accordion from "accordion-js";


const accordion = new Accordion('.mod-list', {
  duration: 500,
  showMultiple: false,
});

const modButtons = document.querySelectorAll('.mod-button');

modButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parentItem = button.closest('.mod-item');
    const answer = parentItem.querySelector('.mod-answer');
    const isActive = button.classList.contains('active');

    document.querySelectorAll('.mod-answer').forEach(ans => {
      ans.style.maxHeight = null;
      ans.style.opacity = '0';
      ans.style.transition = 'opacity 0.3s ease, max-height 0.5s ease';
    });

    document.querySelectorAll('.mod-button').forEach(btn => {
      btn.classList.remove('active');
    });

    if (!isActive) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.opacity = '1';
      answer.style.transition = 'opacity 0.5s ease, max-height 0.5s ease';
      button.classList.add('active');
    }
  });
});
