let users = [
	{
		id: "1",
		name: "Test 1",
		email: "test1@example.com"
	},
	{
		id: "2",
		name: "Test 2",
		email: "test2@example.com",
		age: 21
	},
	{
		id: "3",
		name: "Alex",
		email: "alex@example.com",
		age: 24
	}
];

let posts = [
	{
		id: "1",
		title: "Body Rum",
		body: "Testing...",
		published: true,
		author: "1"
	},
	{
		id: "2",
		title: "Testing",
		body: "Body... Wine",
		published: true,
		author: "3"
	},
	{
		id: "3",
		title: "Unique",
		body: "Whiskey...",
		published: false,
		author: "1"
	}
];

let comments = [
	{
		id: "1",
		comment: "Nice post",
		author: "2",
		post: "3"
	},
	{
		id: "2",
		comment: "Amazing",
		author: "1",
		post: "2"
	},
	{
		id: "3",
		comment: "Good",
		author: "3",
		post: "2"
	},
	{
		id: "4",
		comment: "Ok",
		author: "3",
		post: "1"
	},
	{
		id: "5",
		comment: "Terrible",
		author: "2",
		post: "2"
	}
];

const db = {
	users,
	posts,
	comments
};

module.exports = db;
