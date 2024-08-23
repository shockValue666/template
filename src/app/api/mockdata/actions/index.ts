import { client } from "@/lib/prisma";


export async function createUsers() {
    try {
        const createMany = client.user.createManyAndReturn({
            data:[
                {name:"John Doe", email:"JfQpP@example.com"},
                { name: "Jane Smith", email: "JaneS@example.com" },
                { name: "Alice Johnson", email: "AliceJ@example.com" },
                { name: "Bob Brown", email: "BobB@example.com" },
                { name: "Charlie Davis", email: "CharlieD@example.com" },
                { name: "Diana Evans", email: "DianaE@example.com" },
                { name: "Edward Harris", email: "EdwardH@example.com" },
                { name: "Fiona Garcia", email: "FionaG@example.com" },
                { name: "George King", email: "GeorgeK@example.com" },
                { name: "Hannah Lee", email: "HannahL@example.com" },
            ],
            skipDuplicates: true,
        })
        if(createMany) {
            return createMany
        }
    } catch (error) {
        console.log("failed to create many users: ",error)
    }

}


export async function createPosts() {
    try {
        const createMany = await client.post.createManyAndReturn({
            data:[
                {
                    title: "First Post by John Doe",
                    content: "This is the first post content by John Doe.",
                    published: true,
                    authorId: (await client.user.findFirst({ where: { email: "JfQpP@example.com" } }))!.id,
                },
                {
                    title: "Thoughts on Next.js by Jane Smith",
                    content: "Jane Smith shares her thoughts on using Next.js for modern web development.",
                    published: true,
                    authorId: (await client.user.findFirst({ where: { email: "JaneS@example.com" } }))!.id,
                },
                {
                    title: "Alice Johnson's Guide to TypeScript",
                    content: "A comprehensive guide to using TypeScript in your projects by Alice Johnson.",
                    published: false,
                    authorId: (await client.user.findFirst({ where: { email: "AliceJ@example.com" } }))!.id,
                },
                {
                    title: "Understanding React Hooks",
                    content: "Bob Brown explains the intricacies of React Hooks and how to use them effectively.",
                    published: true,
                    authorId: (await client.user.findFirst({ where: { email: "BobB@example.com" } }))!.id,
                },
                {
                    title: "Advanced PostgreSQL Queries",
                    content: "Charlie Davis dives deep into advanced querying techniques in PostgreSQL.",
                    published: false,
                    authorId: (await client.user.findFirst({ where: { email: "CharlieD@example.com" } }))!.id,
                },
                {
                    title: "Introduction to GraphQL",
                    content: "Diana Evans introduces the basics of GraphQL and its benefits over REST.",
                    published: true,
                    authorId: (await client.user.findFirst({ where: { email: "DianaE@example.com" } }))!.id,
                },
                {
                    title: "Getting Started with Prisma",
                    content: "Edward Harris provides a step-by-step guide to getting started with Prisma ORM.",
                    published: true,
                    authorId: (await client.user.findFirst({ where: { email: "EdwardH@example.com" } }))!.id,
                },
                {
                    title: "Fiona Garcia's Favorite JavaScript Libraries",
                    content: "Fiona Garcia lists and reviews her favorite JavaScript libraries for front-end development.",
                    published: true,
                    authorId: (await client.user.findFirst({ where: { email: "FionaG@example.com" } }))!.id,
                },
                {
                    title: "Exploring Serverless Architectures",
                    content: "George King discusses the pros and cons of serverless architectures in modern applications.",
                    published: false,
                    authorId: (await client.user.findFirst({ where: { email: "GeorgeK@example.com" } }))!.id,
                },
                {
                    title: "CSS Grid vs. Flexbox",
                    content: "Hannah Lee compares CSS Grid and Flexbox for responsive web design.",
                    published: true,
                    authorId: (await client.user.findFirst({ where: { email: "HannahL@example.com" } }))!.id,
                },
            ],
            skipDuplicates:true
        })
        if(createMany){
            return createMany;
        }
    } catch (error) {
        console.log("error creating many posts: ",error)
    }
}

export const getUserIds = async () => {
    try {
        const userIds = await client.user.findMany({select: {id: true}})
        if(userIds){
            return userIds
        }
    } catch (error) {
        console.log("error fetching userIds: ",error)
    }
}

const userIds = [
  { id: '4bc3f79a-2a74-4e90-9910-2a13c46fcbf7' },
  { id: '5cdc831b-d713-4c39-b373-30e11c3564d0' },
  { id: 'e008a8aa-153e-44a5-bc20-4a02d2d4304a' },
  { id: '3ccf8296-8c27-4a60-82da-2f64524ed23f' },
  { id: '95d46976-91fc-46cf-b228-8b9db48adddd' },
  { id: '862f5903-1308-44df-954d-ffcc416a5f4d' },
  { id: 'fc403433-936a-48b0-a80c-b862efeea85a' },
  { id: 'fc8a3881-dda8-495e-b0d4-5f23811ca7bf' },
  { id: '1c32ad54-4f52-4be9-bc5e-6fa0807cc409' },
  { id: '3d3016b3-f434-45d8-b9c0-6088300c613d' }
]

export const addInvoiceMockData = async () => {
    const statuses = ["paid", "pending", "overdue"];
    try {
        for(let i = 0 ; i<50 ; i++){
            await client.invoice.create({
                data: {
                    userId: userIds[Math.floor(Math.random() * userIds.length)].id,
                    amount: Math.random() * 1000, // Random amount between 0 and 1000
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    issuedAt: new Date(new Date().getTime() - Math.floor(Math.random() * 10000000000)), // Random past date
                    paidAt: Math.random() > 0.5 ? new Date() : null, // 50% chance of being paid
                },
            });
        }
    } catch (error) {
        console.log("error inserting invoice mock data: ",error)
    }
}

export const addSubscriptionMockData = async () => {
    const plans = ["Basic", "Premium", "Pro"];
    try {
        for (let i = 0; i < 50; i++) {
            const startedAt = new Date(new Date().getTime() - Math.floor(Math.random() * 10000000000)); // Random past start date
            await client.subscription.create({
                data: {
                    userId: userIds[Math.floor(Math.random() * userIds.length)].id,
                    plan: plans[Math.floor(Math.random() * plans.length)],
                    startedAt: startedAt,
                    expiresAt: new Date(startedAt.getTime() + Math.floor(Math.random() * 31536000000)), // Random expiration within a year
                    isActive: Math.random() > 0.5, // 50% chance of being active
                },
                select:{
                    id:true
                }
            });
        }
    }catch(err){
        console.log("error creating subscription mock data: ",err)
    }
}