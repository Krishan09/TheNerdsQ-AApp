import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import cookieSession from "cookie-session";
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


app.use(
	cookieSession({
		name: "session",
		keys: ["james bond"],

		// Cookie Options
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	})
);




if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, router);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

app.use(logErrors());

export default app;
