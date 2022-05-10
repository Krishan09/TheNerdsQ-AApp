//import { RestartProcess } from "concurrently";
import { Router } from "express";
import { registerUsers } from "./data";
import { loginUser } from "./data";
import jwt from "jsonwebtoken";
import { /*bcrypt,*/ hash, compare } from "bcryptjs";
//import asyncHandler from "express-async-handler";
//import cors from "cors";
//import app from "./app";
//import { questionsData } from "./Mock/Data";

import db from "./db";

const router = Router();

const users = [
	{
		username: "Huhu",
		email: "test@123.test",
		password: "$2a$10$t/9aytkxdQz8j27dDttVnek/fRqSiJnco9BgxwAmldZYj3WsW8UXK", //pass "test123"
	},
];

/*router.get("/", verifyToken, (_, res) => {
	res.json({ message: "Hello, world!" });
});*/

/*router.get("/", verifyToken, (req, res) => {
	jwt.verify(req.token, "secretkey", (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.json({
				msg: "Hello, world!",
				authData,
			});
		}
	});
});*/

/*router.get("/me", verifyToken, async (req, res) => {
	jwt.verify(req.token, "secretkey", (err, authData) => {
		const { username, email } = await user.find(req.token.email)

	});
});*/

//testing

router.get("/", verifyToken, (req, res) => {
	jwt.verify(req.token, "secretkey", (err, authData) => {
		if (err) {
			res.sendStatus(403); //or can be used res.status(403).json({ msg: "Invalid token" });
		} else {
			res.json({
				msg: "Hello, world!",
				authData,
			});
		}
	});
});

//const queryUsers = "SELECT * FROM users";

router.get("/users1", (req, res) => {
	db.query("SELECT * FROM users", (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.send(result.rows);
		}
	});
});

router.get("/users", (req, res) => {
	res.status(200).json(users);
});

/*router.post("/register", asyncHandler (async (req, res) => {
	const { username, email, password } = req.body;

	if(!username || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}
	res.json({ msg: "User registered!" });
}));*/
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	const user = users.find((user) => user.email === email);
	try {
		if (!username || !email || !password) {
			res.status(400).json({ msg: "Please fill all fields" });
		} else {
			//const user = users.find((user) => user.email === email);
			if (user) {
				res.status(400).json({ msg: "email already registered" });
				//throw new Error("email already registered");
			} else {
				const hashedPassword = await hash(password, 10);

				//const hashedPassword = await hash(password, 10);

				await registerUsers(email, username, hashedPassword);
				res.status(200).json({ msg: "User created" });
			}
		}
		/*}
	catch (err) {
		res.json({ error: `${err.message}` });
	}*/
	} catch (err) {
		//res.json({ msg: "Please fill all fields!" });
		console.log(err);
		throw new Error({ error: `${err}` });
	}
});

/*router.get("/login", (req, res) => {
	res.json({
		token: "test123",
	});
});*/

/*router.post("/login", (req, res) => {
	let data = users.find((user) => user.email === req.body.email);
	if(data) {
		if(data.password === req.body.password) {
			/*res.status(200).json( {
				msg: "Login successful!",
			});*/
//JWT using timer
/*jwt.sign({ data }, "secretkey", { expiresIn: "30s" }, (err, token) => {
				res.json({ msg: "Login successful", token });
			});*/
/*jwt.sign({ data }, "secretkey", (err, token) => {
				res.json({ msg: "Login successful", token });
			});
		} else {
			res.status(200).json( {
				msg: "Wrong password!",
			});
		}
	} else {
		res.status(200).json( {
			msg: "User not found!",
		});
	}
});*/

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {

		if (data) {
			const valid = await compare(password, data.password);
			if (valid) {

				//creating accesToken with refresh token
				const token = await jwt.sign(
					{ data: { username: data.username, email: data.email } },
					"secretkey",
					{ expiresIn: "15s" }
				);
				const refreshToken = await jwt.sign(
					{ data: { username: data.username, email: data.email } },
					"refreshsecretkey",
					{ expiresIn: "1m" }
				);
				refreshTokens.push(refreshToken);
				res.json({ token, refreshToken, data: { username: data.username } });
			} else {
				res.status(400).json({
					msg: "Wrong password!",
				});
			}
		} else {
			res.status(400).json({
				msg: "User not found!",
			});
		}
	} catch (err) {
		res.json({ msg: `${err}` });
	}
});

// only for use with the acces and refresh token version
let refreshTokens = [];

router.post("/token", async (req, res) => {
	const refreshToken = req.header("x-auth-token");

	if (!refreshToken) {
		res.status(401).json({ msg: "Token not found" });
	}
	if (!refreshToken.includes(refreshToken)) {
		res.status(403).json({ msg: "Invalid refresh Token" });
	}

	try {
		const user = await jwt.verify(refreshToken, "refreshsecretkey");
		const { data } = user;
		const token = await jwt.sign(
			{ data: { username: data.username, email: data.email } },
			"secretkey",
			{ expiresIn: "20s" }
		);
		res.json({ token });
	} catch (error) {
		res.status(403).json({ msg: "Invalid token" });
	}
});

router.post("/logout", (req, res) => {
	const refreshToken = req.header("x-auth-token");

	refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
	res.sendStatus(204);
});

// Token format
// Authorization: Bearer <access_token>

//One way to authenticate token
//verify token
function verifyToken(req, res, next) {
	//get authentication header value
	const bearerHeader = req.headers["authorization"];
	//Check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		//Split at the space
		const bearer = bearerHeader.split(" ");
		//Get token from array
		const bearerToken = bearer[1];
		//Set token
		req.token = bearerToken;
		//Next middleware
		next();
	} else {
		//Forbidden
		res.status(403).json({ msg: "not authorized!" });
	}
}

//Second way to authenticate the token

/*const authToken = async (req, res, next) => {
	const token = req.header["x-auth-token"];

		//not token error message
		if(!token) {
			res.status(401).json({ error: { msg: "no token found" } } );
		}

		//token validation
		try {
			const user = await jwt.verify(token, "secretkey");
			req.user = user.email;//, user.name;
			next();
		} catch (error) {
			res.status(403).json({ error, msg: "Invalid token" } );
		}

	};*/

//const questionsQuery = "SELECT * FROM questions";
//const answersQuery = "SELECT * FROM answers";

router.get("/questions", async (req, res) => {
	const questionsQuery = "SELECT * FROM questions";
	try {
		const result = await db.query(questionsQuery);
		res.json(result.rows);
	} catch (error) {
		res.status(500).send(error);
	}
});

const isValid = (n) => {
	return !isNaN(n) && n >= 0;
};

//getting questions by id //
router.get("/questions/:id", async (req, res) => {
	const questionsId = req.params.id;
	const questionsById = `SELECT * FROM questions WHERE id=${questionsId}`;
	const checkIfExists = `select exists(select 1 from questions where id=${questionsId})`;
	if (!isValid(questionsId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `A question by the id ${questionsId} does not exist!`,
				});
			} else {
				db.query(questionsById)
					.then((result) => res.json(result.rows))
					.catch((e) => console.error(e));
			}
		});
	}
});

//getting answers by Question id //
router.get("/answers/:id", async (req, res) => {
	const questionId = req.params.id;
	const answersByQId = `SELECT * FROM answers WHERE question_id=${questionId}`;
	const checkIfExists = `select exists(select 1 from questions where id=${questionId})`;
	if (!isValid(questionId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `answers by the question id ${questionId} does not exist!`,
				});
			} else {
				db.query(answersByQId)
					.then((result) => res.json(result.rows))
					.catch((e) => console.error(e));
			}
		});
	}
});


//Api endpoint for updating questions

router.patch("/questions", async (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	const id = req.body.id;
	let questionUpdateQuery;
	if (!isValid(id)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else if (title && isValid(id)) {
		questionUpdateQuery =
			"UPDATE questions SET title=$1, content=$2 WHERE id=$3";
		try {
			await db.query(questionUpdateQuery, [title, content, id]);
			res.status(200).send({
				Success: "Your question including the title is successfully updated!",
			});
		} catch (error) {
			res.status(500).send(error);
		}
	} else if (!title && isValid(id)) {
		questionUpdateQuery = "UPDATE questions SET content=$1 WHERE id=$2";
		try {
			await db.query(questionUpdateQuery, [content, id]);
			res.status(200).send({
				Success: "Your question is successfully updated!",
			});
		} catch (error) {
			res.status(500).send(error);
		}
	}
});

//Api endpoint for updating answers
router.patch("/answers", async (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	const id = req.body.id;
	let questionUpdateQuery;
	if (!isValid(id)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else if (title && isValid(id)) {
		questionUpdateQuery = "UPDATE answers SET title=$1, content=$2 WHERE id=$3";
		try {
			await db.query(questionUpdateQuery, [title, content, id]);
			res.status(200).send({
				Success: "Your answer including the title is successfully updated!",
			});
		} catch (error) {
			res.status(500).send(error);
		}
	} else if (!title && isValid(id)) {
		questionUpdateQuery = "UPDATE answers SET content=$1 WHERE id=$2";
		try {
			await db.query(questionUpdateQuery, [content, id]);
			res.status(200).send({
				Success: "Your answer is successfully updated!",
			});
		} catch (error) {
			res.status(500).send(error);
		}
	}
});

// endpoint for post questions

router.post("/question", async (req, res) => {
	const category = req.body.category;
	const title = req.body.title;
	const content = req.body.content;
	const query =
		"INSERT INTO questions (category, title, content) VALUES ($1,$2, $3)";
	try {
		await db.query(query, [category, title, content]);
		res.status(201).send({ Success: "Your Question is Successfully Posted!" });
	} catch (error) {
		res.status(500).send(error);
	}
});

//endpoint for post answers

router.post("/answer", async (req, res) => {
	const questionId = req.body.question_id;
	const content = req.body.answer_content;
	const query = "INSERT INTO answers (content, question_id) VALUES ($1,$2)";
	try {
		await db.query(query, [content, questionId]);
		res.status(201).send({ Success: "Your Answer is Successfully Posted!" });
	} catch (error) {
		res.status(500).send(error);
	}
});

// endpoint delete questions
router.delete("/questions/:id", async (req, res) => {
	const questionId = req.params.id;
	const deleteById = `DELETE FROM questions WHERE id=${questionId}`;
	const checkIfExists = `select exists(select 1 from questions where id=${questionId})`;
	if (!isValid(questionId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `A question by the id ${questionId} does not exist!`,
				});
			} else {
				db.query(deleteById)
					.then(() =>
						res.json({
							message: `A question by the id ${questionId} is Successfully deleted!`,
						})
					)
					.catch((e) => console.error(e));
			}
		});
	}
});

//endpoint for delete answers
router.delete("/answers/:id", async (req, res) => {
	const answerId = req.params.id;
	const deleteById = `DELETE FROM answers WHERE id=${answerId}`;
	const checkIfExists = `select exists(select 1 from answers where id=${answerId})`;
	if (!isValid(answerId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `A answer by the id ${answerId} does not exist!`,
				});
			} else {
				db.query(deleteById)
					.then(() =>
						res.json({
							message: `An answer by the id ${answerId} is Successfully deleted!`,
						})
					)
					.catch((e) => console.error(e));
			}
		});
	}
});

// endpoint delete questions
router.delete("/questions/:id", async (req, res) => {
	const questionId = req.params.id;
	const deleteById = `DELETE FROM questions WHERE id=${questionId}`;
	const checkIfExists = `select exists(select 1 from questions where id=${questionId})`;
	if (!isValid(questionId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `A question by the id ${questionId} does not exist!`,
				});
			} else {
				db.query(deleteById)
					.then(() =>
						res.json({
							message: `A question by the id ${questionId} is Successfully deleted!`,
						})
					)
					.catch((e) => console.error(e));
			}
		});
	}
});
//endpoint for delete answers
router.delete("/answers/:id", async (req, res) => {
	const answerId = req.params.id;
	const deleteById = `DELETE FROM answers WHERE id=${answerId}`;
	const checkIfExists = `select exists(select 1 from answers where id=${answerId})`;
	if (!isValid(answerId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `A answer by the id ${answerId} does not exist!`,
				});
			} else {
				db.query(deleteById)
					.then(() =>
						res.json({
							message: `An answer by the id ${answerId} is Successfully deleted!`,
						})
					)
					.catch((e) => console.error(e));
			}
		});
	}
});
// endpoint delete questions
router.delete("/questions/:id", async (req, res) => {
	const questionId = req.params.id;
	const deleteById = `DELETE FROM questions WHERE id=${questionId}`;
	const checkIfExists = `select exists(select 1 from questions where id=${questionId})`;
	if (!isValid(questionId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `A question by the id ${questionId} does not exist!`,
				});
			} else {
				db.query(deleteById)
					.then(() =>
						res.json({
							message: `A question by the id ${questionId} is Successfully deleted!`,
						})
					)
					.catch((e) => console.error(e));
			}
		});
	}
});
//endpoint for delete answers
router.delete("/answers/:id", async (req, res) => {
	const answerId = req.params.id;
	const deleteById = `DELETE FROM answers WHERE id=${answerId}`;
	const checkIfExists = `select exists(select 1 from answers where id=${answerId})`;
	if (!isValid(answerId)) {
		res.status(400).json({ "Server message": "Invalid id!" });
	} else {
		db.query(checkIfExists).then((result) => {
			const exists = result.rows.map((el) => el.exists);
			let doesExist = exists.pop();
			if (!doesExist) {
				res.status(404).json({
					message: `A answer by the id ${answerId} does not exist!`,
				});
			} else {
				db.query(deleteById)
					.then(() =>
						res.json({
							message: `An answer by the id ${answerId} is Successfully deleted!`,
						})
					)
					.catch((e) => console.error(e));
			}
		});
	}
});

export default router;
