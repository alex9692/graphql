module.exports.Post = {
	author(parent, args, context, info) {
		const foundUser = context.db.users.find(user => {
			return user.id === parent.author;
		});
		if (!foundUser) {
			throw new Error("User doesn't exists now");
		}
		return foundUser;
	},
	comments(parent, args, context, info) {
		return context.db.comments.filter(comment => {
			return comment.post === parent.id;
		});
	}
};
