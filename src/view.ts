import { Emails } from './emails.model';

export class View {
    constructor(private storage: Emails, private htmlElements: any) {
    }

    update() {
        const items = this.storage.getAll();
        const fragment = document.createDocumentFragment();

        this.htmlElements.container.innerHTML = items.length > 0 ? '' : '<div class="text-center fw-light">Nothing to show<div>';
        this.htmlElements.clearAllBtn.style.display = items.length > 0 ? 'block' : 'none';

        items.forEach(text => {
            const li = document.createElement('li');
            li.dataset.id = text;
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
            li.innerHTML = `
                <div class="clickable" data-action="copy">
                    <div class="fw-bold">${text}</div>
                    <small class="text-secondary fst-italic">
                        ${(new Date(Number(text.split('@')[0]))).toLocaleString()}
                    </small>
                </div>
                <button class="btn-close" data-action="remove"></button>
            `;
            fragment.appendChild(li);
        });

        this.htmlElements.container.appendChild(fragment);
    }
}
