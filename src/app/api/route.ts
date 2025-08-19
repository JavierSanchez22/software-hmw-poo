import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    if (data && data.title !== undefined && data.description !== undefined && data.author !== undefined) {
        console.log('Received Title: ', data.title)
        console.log('Received Description: ', data.description)
        console.log('Received Author: ', data.author)
        
        if (typeof data.title == 'string' && typeof data.description == 'string' && typeof data.author == 'string') {
            if (data.title.length >= 5 && data.title.length <= 100 && data.title.trim() !== '' && data.title != null) {
                console.log('Is valid title: ', data.title);
            } else {
                return NextResponse.json({
                    message: 'Invalid Title',
                    title: data.title
                }, { status: 400 });
            }
            
            if (data.description.length >= 10 && data.description.length <= 500 && data.description.trim() !== '' && data.description != null) {
                console.log('Is valid description: ', data.description);
            } else {
                return NextResponse.json({
                    message: 'Invalid Description',
                    description: data.description 
                }, { status: 400 });
            }
            
            const authorRegex = /^[A-ZÁÉÍÓÚÑÜ][A-Za-záéíóúñü'\-.]+(?: [A-Za-záéíóúñü'\-\.]+)*$/;
            if (authorRegex.test(data.author)) {
                console.log('Is valid author: ', data.author);
            } else {
                return NextResponse.json({
                    message: 'Invalid Author',
                    author: data.author 
                }, { status: 400 });
            }
            
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