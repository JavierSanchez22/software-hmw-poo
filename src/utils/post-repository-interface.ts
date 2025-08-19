import { Post } from './posts';

export interface PostRepositoryInterface {
    save(article: Post): Promise<void>;
    findAll(): Promise<Post[]>;
    findById(id: string): Promise<Post | null>;
}
