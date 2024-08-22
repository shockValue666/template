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