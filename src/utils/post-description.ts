export class PostDescription {
    private constructor(private readonly value: string) {}

    static create(description: string): PostDescription {
        if (typeof description !== 'string' || description.length < 10 || description.length > 500 || description.trim() === '' || description == null) {
            throw new Error('Invalid Description');
        }
        return new PostDescription(description);
    }

    getValue(): string {
        return this.value;
    }
}