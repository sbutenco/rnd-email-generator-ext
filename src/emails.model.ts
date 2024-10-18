export class Emails {
    private readonly key = 'generated_emails';

    add(item: string) {
        const emails = this.getFromStorage();
        emails.push(item);
        this.saveToStorage(emails);
    }

    remove(item: string) {
        let emails = this.getFromStorage();
        emails = emails.filter(value => value !== item);
        this.saveToStorage(emails);
    }

    getAll() {
        return this.getFromStorage();
    }

    removeAll() {
        this.saveToStorage([]);
    }

    private getFromStorage(): string[] {
        const data = JSON.parse(localStorage.getItem(this.key) || '');
        return Array.isArray(data) ? data : [];
    }

    private saveToStorage(data: string[]) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
}
