module.exports.Query = {
	users(parent, args, context, info) {
		const { users } = context.db;

		if (!args.query) return users;
		return users.filter(user => {
			return user.name.toLowerCase().includes(args.query.toLowerCase());
		});
	},
	posts(parent, args, context, info) {
		const { posts } = context.db;

		if (!args.query) return posts;
		return posts.filter(post => {
			return (
				post.title.toLowerCase().includes(args.query.toLowerCase()) ||
				post.body.toLowerCase().includes(args.query.toLowerCase())
			);
		});
	},
	me(parent, args, context, info) {
		return context.db.users[1];
	},
	post(parent, args, context, info) {
		return context.db.posts[1];
	},
	comments(parent, args, context, info) {
		return context.db.comments;
	}
};
