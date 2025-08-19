import { Post } from './posts';

export class PostValidator {
    validate(title: string, description: string, author: string): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!Post.isValidTitle(title)) {
            errors.push('Invalid Title');
        }

        if (!Post.isValidDescription(description)) {
            errors.push('Invalid Description');
        }

        if (!Post.isValidAuthor(author)) {
            errors.push('Invalid Author');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}