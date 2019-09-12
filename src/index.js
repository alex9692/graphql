const { GraphQLServer } = require("graphql-yoga");

const db = require("./db");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Post } = require("./resolvers/Post");
const { User } = require("./resolvers/User");
const { Comment } = require("./resolvers/Comment");

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers: {
		Query,
		Mutation,
		Post,
		User,
		Comment
	},
	context: {
		db
	}
});

server.start(() => {
	console.log("server is up");
});
