import postgres from 'postgres';
import { PostValidator } from '../utils/post-validator';
import { Post } from '../utils/posts';

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

        try {
            const post = Post.create(title, description, author);
            await this.sql`INSERT INTO post (title, description, author) VALUES (${post.getTitle()}, ${post.getDescription()}, ${post.getAuthor()})`;
            console.log('Data inserted successfully');

            console.log('Is valid title: ', post.getTitle());
            console.log('Is valid description: ', post.getDescription());
            console.log('Is valid author: ', post.getAuthor());

            return {
                success: true,
                message: 'Post registered successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to create post',
                errors: [error instanceof Error ? error.message : 'Unknown error']
            };
        }
    }
}