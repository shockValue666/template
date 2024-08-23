import { NextRequest, NextResponse } from "next/server";
import { addInvoiceMockData, addSubscriptionMockData, createPosts, createUsers, getUserIds } from "./actions";

export async function GET(req:NextRequest, res: NextResponse) {
    // const users = await createUsers();
    // if(users){
    //     return NextResponse.json({users:users})
    // }

    // const posts = await createPosts();
    // if(posts){
    //     return NextResponse.json({posts:posts})
    // }

    // const userIds = await getUserIds();
    // console.log("userIds: ",userIds)

    // const invoiceMockData = await addInvoiceMockData()
    // console.log("invoiceMockData: ",invoiceMockData)

    // const subscriptionMockData = await addSubscriptionMockData()
    // console.log("subscriptionMockData: ",subscriptionMockData)

    return NextResponse.json({name: 'John Doe'})
}