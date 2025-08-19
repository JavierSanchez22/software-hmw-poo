import postgres from 'postgres';
import { PostValidator } from './post-validator';
import { Post } from './posts';

export class PostRegistrer {
    private sql = postgres('postgresql://postgres.paigqspqcrcpmekowghr:S@nchez695313@aws-1-us-east-2.pooler.supabase.com:6543/postgres');
    
    constructor(private postValidator: PostValidator) {}

    async register(title: string, description: string, author: string): Promise<{ success: boolean; message: string; errors?: string[] }> {
        console.log('Received Title: ', title);
        console.log('Received Description: ', description);
        console.log('Received Author: ', author);

        if (typeof title !== 'string' || typeof description !== 'string' || typeof author !== 'string') {
            return {
                success: false,
                message: 'Invalid data types. Title, description and author must be strings.'
            };
        }

        const validation = this.postValidator.validate(title, description, author);

        if (!validation.isValid) {
            return {
                success: false,
                message: 'Validation failed',
                errors: validation.errors
            };
        }

        const post = new Post(title, description, author);
        await this.sql`INSERT INTO post (title, description, author) VALUES (${post.title}, ${post.description}, ${post.author})`;
        console.log('Data inserted successfully');

        console.log('Is valid title: ', post.title);
        console.log('Is valid description: ', post.description);
        console.log('Is valid author: ', post.author);

        return {
            success: true,
            message: 'Post registered successfully'
        };
    }
}