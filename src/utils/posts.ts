export class Post {
    constructor(
        public title: string,
        public description: string,
        public author: string
    ) {}

    static isValidTitle(title: string): boolean {
        return typeof title === 'string' && title.length >= 5 && title.length <= 100 && title.trim() !== '' && title != null;
    }

    static isValidDescription(description: string): boolean {
        return typeof description === 'string' && description.length >= 10 && description.length <= 500 && description.trim() !== '' && description != null;
    }

    static isValidAuthor(author: string): boolean {
        const authorRegex = /^[A-ZÁÉÍÓÚÑÜ][A-Za-záéíóúñü'\-.]+(?: [A-Za-záéíóúñü'\-\.]+)*$/;
        return typeof author === 'string' && authorRegex.test(author);
    }
}