const uuid_v1 = require("uuid/v1");

module.exports.Mutation = {
	createUser(parent, args, context, info) {
		const { name, email, age } = args.data;
		const { users } = context.db;
		const emailExists = users.find(user => email === user.email);
		if (emailExists) {
			throw new Error("Email is already taken!!!");
		}

		const user = {
			id: uuid_v1(),
			name,
			email,
			age
		};

		users.push(user);
		return user;
	},
	deleteUser(parent, args, context, info) {
		const index = users.findIndex(user => args.id === user.id);
		const { users } = context.db;
		if (index === -1) {
			throw new Error("User doesn't exist");
		}

		const deletedUser = { ...[...users][index] };
		users[index].name = "Doesn't exists";
		users[index].email = "Doesn't exists";
		return deletedUser;
	},
	updateUser(parent, args, context, info) {
		const { id, data } = args;
		let { users } = context.db;
		let emailTaken;
		const index = users.findIndex(user => user.id === id);
		if (index === -1) {
			throw new Error("User doesn't exist");
		}
		if (data.email) {
			emailTaken = users.find((user, i) => {
				// let match;
				if (index !== i) return user.email === data.email;
				// return match;
			});
		}
		if (emailTaken) {
			throw new Error("Email already taken");
		}

		const updatedUser = {
			...users[index],
			...data
		};
		users[index] = updatedUser;
		return updatedUser;
	},
	createPost(parent, args, context, info) {
		const { title, body, author, published } = args.data;
		const { users, posts } = context.db;
		const { pubsub } = context;
		const user = users.find(user => author === user.id);
		if (!user) {
			throw new Error("No User found with the ID: '" + author + "'.");
		}
		const post = {
			id: uuid_v1(),
			title,
			body,
			author,
			published
		};

		if (published) {
			pubsub.publish("post", {
				post: {
					mutation: "Create",
					data: post
				}
			});
		}
		posts.push(post);
		return post;
	},
	deletePost(parent, args, context, info) {
		let { posts, comments } = context.db;
		const { pubsub } = context;
		const index = posts.findIndex(post => args.id === post.id);
		if (index === -1) {
			throw new Error("Post doesn't exist");
		}

		const deletedPost = posts.splice(index, 1)[0];
		comments = comments.filter(comment => {
			return comment.post !== args.id;
		});
		if (deletedPost.published) {
			pubsub.publish("post", {
				post: {
					mutation: "Delete",
					data: deletedPost
				}
			});
		}
		return deletedPost;
	},
	updatePost(parent, args, context, info) {
		let { posts } = context.db;
		const { pubsub } = context;
		const { id, data } = args;
		const index = posts.findIndex(post => post.id === id);
		console.log(posts[index].published);

		const updatedPost = {
			...posts[index],
			...data
		};
		if (updatedPost.published !== posts[index].published) {
			if (updatedPost.published) {
				pubsub.publish("post", {
					post: {
						mutation: "Created",
						data: updatedPost
					}
				});
			} else if (!updatedPost.published) {
				pubsub.publish("post", {
					post: {
						mutation: "Deleted",
						data: {
							...posts[index],
							published: updatedPost.published
						}
					}
				});
			}
		} else if (posts[index].published) {
			pubsub.publish("post", {
				post: {
					mutation: "Updated",
					data: updatedPost
				}
			});
		}
		posts[index] = updatedPost;

		return updatedPost;
	},
	createComment(parent, args, context, info) {
		const { comment, author, post } = args.data;
		const { users, posts, comments } = context.db;
		const { pubsub } = context;
		const errArray = [];
		const user = users.find(user => user.id === author);
		if (!user) {
			errArray.push("User doesn't exist");
		}
		const postExists = posts.find(singlePost => singlePost.id === post);
		if (!postExists || (postExists && !postExists.published)) {
			errArray.push("Post doesn't exist or Post isn't published");
		}
		if (errArray.length > 0) {
			const errMsg = errArray.join(",");
			throw new Error(errMsg);
		}

		const newComment = {
			id: uuid_v1(),
			comment,
			author,
			post
		};

		comments.push(newComment);
		pubsub.publish(`comment#${post}`, {
			comment: {
				mutation: "Created",
				data: newComment
			}
		});
		return newComment;
	},
	deleteComment(parent, args, context, info) {
		const { comments } = context.db;
		const { pubsub } = context;
		const index = comments.findIndex(comment => comment.id === args.id);
		if (index === -1) {
			throw new Error("Comment doesn't exist");
		}

		const deletedComment = comments.splice(index, 1)[0];
		pubsub.publish(`comment#${deletedComment.post}`, {
			comment: {
				mutation: "Deleted",
				data: deletedComment
			}
		});

		return deletedComment;
	},
	updateComment(parent, args, context, info) {
		let { comments } = context.db;
		const { pubsub } = context;
		const { id, data } = args;
		const index = comments.findIndex(comment => comment.id === id);

		const updatedComment = {
			...comments[index],
			...data
		};

		if (updatedComment.comment !== comments[index].comment) {
			pubsub.publish(`comment#${updatedComment.post}`, {
				comment: {
					mutation: "Updated",
					data: updatedComment
				}
			});
		}

		comments[index] = updatedComment;
		return updatedComment;
	}
};
