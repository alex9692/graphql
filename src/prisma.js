const { Prisma } = require("prisma-binding");

const prisma = new Prisma({
	typeDefs: "src/generated/prisma.graphql",
	endpoint: "http://localhost:4466"
});

// READING USERS
// prisma.query
// 	.users(null, "{ id name email posts { id title body } }")
// 	.then(data => console.log(JSON.stringify(data, undefined, 2)))
// 	.catch(err => console.log(err));

// READING COMMENTS
// prisma.query
// 	.comments(
// 		null,
// 		"{ id comment author { id name email } post { id title body } }"
// 	)
// 	.then(data => console.log(JSON.stringify(data, undefined, 2)))
// 	.catch(err => console.log(err));

// CREATE POST
// prisma.mutation
// 	.createPost(
// 		{
// 			data: {
// 				title: "Prisma",
// 				body: "",
// 				published: false,
// 				author: {
// 					connect: {
// 						id: "ck0ilj7yb01ob09302ji1o7cu"
// 					}
// 				}
// 			}
// 		},
// 		"{ id title body published author { id name email} }"
// 	)
// 	.then(data =>
// 		prisma.query.users(null, "{ id name email posts { id title body } }")
// 	)
// 	.then(data => console.log(JSON.stringify(data, undefined, 2)))
// 	.catch(err => console.log(err));


// UPDATE POST
prisma.mutation
	.updatePost(
		{
			data: {
				body: "Graphql with Prisma and postgres",
				published: true
			},
			where: {
				id: "ck0j6nhwl02ck09300i2qylwd"
			}
		},
		"{ id title body published }"
	)
	.then(data => prisma.query.posts(null, "{ id title body published }"))
	.then(data => console.log(JSON.stringify(data, undefined, 2)))
	.catch(err => console.log(err));
