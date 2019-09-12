module.exports.User = {
	posts(parent, args, context, info) {
		return context.db.posts.filter(post => {
			return parent.id === post.author;
		});
	},
	comments(parent, args, context, info) {
		return context.db.comments.filter(comment => {
			return comment.author === parent.id;
		});
	}
};
