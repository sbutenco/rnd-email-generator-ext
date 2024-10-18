import * as bootstrap from 'bootstrap';
import { Emails } from './emails.model';
import { View } from './view';

const toastElList = document.querySelectorAll('.toast');
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, { delay: 2000 }));

const htmlElements = {
    generateBtn: document.getElementById('generate-btn'),
    input: document.getElementById('input'),
    clearAllBtn: document.getElementById('clear-btn'),
    container: document.getElementById('container')
};

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {});
    toastList[0].show();
}

function init() {
    const emails = new Emails();
    const view = new View(emails, htmlElements);

    htmlElements.generateBtn?.addEventListener('click', () => {
        const email = Date.now() + (htmlElements.input as HTMLInputElement).value;
        copyToClipboard(email);
        emails.add(email);
        view.update();
    });

    htmlElements.clearAllBtn?.addEventListener('click', () => {
        emails.removeAll();
        view.update();
    });

    htmlElements.container?.addEventListener('click', (event) => {
        const targetEl = event.target as HTMLElement;
        const id = (targetEl.closest('[data-id]') as HTMLElement)?.dataset.id;

        if (!id) {
            return;
        }

        if (targetEl.closest('[data-action="copy"]')) {
            copyToClipboard(id);
        }

        if (targetEl.dataset.action === 'remove') {
            emails.remove(id);
            view.update();
        }
    });

    view.update();
}

init();
