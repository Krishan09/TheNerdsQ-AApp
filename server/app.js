import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import router from "./api";
import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "./middleware";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");

const app = express();

app.use(cors());
app.use(express.json());
app.use(configuredHelmet());
app.use(morgan("dev"));

app.use((_, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "GET, POST, DELETE, PUT, PATCH"
	);
	res.setHeader("Access-Control-Allow-Headers", "application/json");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.header(
	  "Access-Control-Allow-Headers",
	  "Access-Control-Allow-Methods",
	  "Access-Control-Allow-Origin",
	  "Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
  });


if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, router);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

app.use(logErrors());

export default app;
