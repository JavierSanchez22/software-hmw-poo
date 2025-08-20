import { NextResponse, NextRequest } from 'next/server';
import { PostRegistrer } from '../../utils/post-registrer';
import { PostValidator } from '../../utils/post-validator';
import { PostRepositoryPostgres } from '../../utils/post-repository-postgres';
import { Post } from '../../utils/posts'
// import { PostRepositoryInMemory } from '../../utils/post-repository-in-memory';

export async function POST(request: NextRequest) {
    const data = await request.json();

    if (!data || data.title === undefined || data.description === undefined || data.author === undefined) {
        return NextResponse.json({
            message: 'Missing required fields: title, description, author'
        }, { status: 400 });
    }

    const postValidator = new PostValidator();
    
    const postRepository = new PostRepositoryPostgres();
    // const articleRepository = new ArticleRepositoryInMemory();
    
    const postRegistrer = new PostRegistrer(postValidator, postRepository);
    
    const result = await postRegistrer.register(data.title, data.description, data.author);

    if (!result.success) {
        return NextResponse.json({
            message: result.message,
            errors: result.errors
        }, { status: 400 });
    }

    return NextResponse.json({
        message: result.message,
        data: {
            title: data.title,
            description: data.description,
            author: data.author
        }
    });
}

export async function GET(){
    try {
        const postRepository = new PostRepositoryPostgres();
        // const postRepository = new PostRepositoryInMemory();

        const posts = await postRepository.findAll();
        const postsData = posts.map(post => ({
            title: post.getTitle(),
            description: post.getDescription(),
            author: post.getAuthor()
        }));

        return NextResponse.json({
            message: 'Post retrieved successfully',
            data: postsData
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to retrieve posts',
            error: error instanceof Error ? error.message: 'Unknown Error'
        })
    }
}

export async function PUT(request: NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({
                message: 'ID parameter is required'
            }, {status: 400});
        }

        const data = await request.json();

        if (!data || data.title === undefined || data.description === undefined || data.author === undefined) {
            return NextResponse.json({
                message: 'Missing required fields: title, description or author'
            }, {status: 400});
        }

        const postValidator = new PostValidator();
        const postRepository = new PostRepositoryPostgres();
        // const postRepository = new PostRepositoryInMemory();

        const validation = postValidator.validate(data.title, data.description, data.author);

        if (!validation.isValid) {
            return NextResponse.json({
                message: 'Validation failed',
                errors: validation.errors
            }, {status: 400});
        }

        const updatePost = Post.create(data.title, data.description, data.author);

        await postRepository.update(id, updatePost);

        return NextResponse.json({
            message: 'Post updated successfully',
            data: {
                title: data.title,
                description: data.description,
                author: data.author
            }});
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to update post',
            error: error instanceof Error ? error.message: 'Unknow Error'
        }, {status: 500});
    }
}