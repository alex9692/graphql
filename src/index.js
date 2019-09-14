const { GraphQLServer, PubSub } = require("graphql-yoga");

const db = require("./db");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Post } = require("./resolvers/Post");
const { User } = require("./resolvers/User");
const { Comment } = require("./resolvers/Comment");
const { Subscription } = require("./resolvers/Subscription");
require("./prisma");

const pubsub = new PubSub();

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers: {
		Query,
		Mutation,
		Post,
		User,
		Comment,
		Subscription
	},
	context: {
		db,
		pubsub
	}
});

server.start(() => {
	console.log("server is up");
});
