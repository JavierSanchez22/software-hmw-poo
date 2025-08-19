export class PostTitle {
    private constructor(private readonly value: string) {}

    static create(title: string): PostTitle {
        if (typeof title !== 'string' || title.length < 5 || title.length > 100 || title.trim() === '' || title == null) {
            throw new Error('Invalid Title');
        }
        return new PostTitle(title);
    }

    getValue(): string {
        return this.value;
    }
}