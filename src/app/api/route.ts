import postgres from 'postgres';
import { NextResponse, NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
    const data = await request.json();
    
    if (data && data.title !== undefined && data.description !== undefined && data.author !== undefined) {
        console.log('Received Title: ', data.title)
        console.log('Received Description: ', data.description)
        console.log('Received Author: ', data.author)
        
        if (typeof data.title == 'string' && typeof data.description == 'string' && typeof data.author == 'string') {
            if (isValidTitle(data.title)) {
                console.log('Is valid title: ', data.title);
            } else {
                return NextResponse.json({
                    message: 'Invalid Title',
                    title: data.title
                }, { status: 400 });
            }
            
            if (isValidDescription(data.description)) {
                console.log('Is valid description: ', data.description);
            } else {
                return NextResponse.json({
                    message: 'Invalid Description',
                    description: data.description 
                }, { status: 400 });
            }
            
            if (isValidAuthor(data.author)) {
                console.log('Is valid author: ', data.author);
            } else {
                return NextResponse.json({
                    message: 'Invalid Author',
                    author: data.author 
                }, { status: 400 });
            }
            
            await saveToDatabase(data.title, data.description, data.author);
            
        } else {
            return NextResponse.json({
                message: 'Invalid data types. Title, description and author must be strings.',
                receivedTypes: {
                    title: typeof data.title,
                    description: typeof data.description,
                    author: typeof data.author
                }
            }, { status: 400 });
        }

    } else {
        return NextResponse.json({
            message: 'Missing required fields: title, description, author'
        }, { status: 400 });
    }
    
    return NextResponse.json({
        message: 'Data is valid',
        data
    });
}

function isValidTitle(title: string): boolean {
    return typeof title === 'string' && title.length >= 5 && title.length <= 100 && title.trim() !== '' && title != null;
}

function isValidDescription(description: string): boolean {
    return typeof description === 'string' && description.length >= 10 && description.length <= 500 && description.trim() !== '' && description != null;
}

function isValidAuthor(author: string): boolean {
    const authorRegex = /^[A-ZÁÉÍÓÚÑÜ][A-Za-záéíóúñü'\-.]+(?: [A-Za-záéíóúñü'\-\.]+)*$/;
    return typeof author === 'string' && authorRegex.test(author);
}

async function saveToDatabase(title: string, description: string, author: string): Promise<void> {
    const sql = postgres('postgresql://postgres.paigqspqcrcpmekowghr:S@nchez695313@aws-1-us-east-2.pooler.supabase.com:6543/postgres');
    await sql`INSERT INTO post (title, description, author) VALUES (${title}, ${description}, ${author})`;
    console.log('Data inserted successfully');
}
