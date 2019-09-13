exports.Subscription = {
	count: {
		subscribe(parent, args, context, info) {
			const { pubsub } = context;
			let count = 0;

			setInterval(() => {
				count++;
				pubsub.publish("count", {
					count
				});
			}, 1000);

			return pubsub.asyncIterator("count");
		}
	},
	comment: {
		subscribe(parent, args, context, info) {
			const { id } = args;
			const { db, pubsub } = context;
			const post = db.posts.find(post => post.id === id && post.published);

			if (!post) {
				throw new Error("Post doesn't exist");
			}

			return pubsub.asyncIterator(`comment#${id}`);
		}
	},
	post: {
		subscribe(parent, args, context, info) {
			const { pubsub } = context;

			return pubsub.asyncIterator("post");
		}
	}
};
