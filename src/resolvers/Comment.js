module.exports.Comment = {
	author(parent, args, context, info) {
		const foundUser = context.db.users.find(user => {
			return user.id === parent.author;
		});
		if (!foundUser) {
			throw new Error("User doesn't exists now");
		}
		return foundUser;
	},
	post(parent, args, context, info) {
		const foundPost = context.db.posts.find(post => {
			return post.id === parent.post;
		});
		if (!foundPost) {
			throw new Error("Post doesn't exists!");
		}
		return foundPost;
	}
};
