export class PostAuthor {
    private constructor(private readonly value: string) {}

    static create(author: string): PostAuthor {
        const authorRegex = /^[A-ZÁÉÍÓÚÑÜ][A-Za-záéíóúñü'\-.]+(?: [A-Za-záéíóúñü'\-\.]+)*$/;
        if (typeof author !== 'string' || !authorRegex.test(author)) {
            throw new Error('Invalid Author');
        }
        return new PostAuthor(author);
    }

    getValue(): string {
        return this.value;
    }
}
