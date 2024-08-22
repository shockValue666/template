import { NextRequest, NextResponse } from "next/server";
import { createPosts, createUsers } from "./actions";

export async function GET(req:NextRequest, res: NextResponse) {
    // const users = await createUsers();
    // if(users){
    //     return NextResponse.json({users:users})
    // }

    // const posts = await createPosts();
    // if(posts){
    //     return NextResponse.json({posts:posts})
    // }

    return NextResponse.json({name: 'John Doe'})
}