import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import resolvers from "./utils/resolvers.js";
import { verifyJwt } from "./middlewares/verifyJwt.middleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: "true",
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// GraphQL Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      ${require("./utils/schema.graphql")}`),
    rootValue: resolvers,
    graphiql: true,
  })
);

// Protect the GraphQL API with JWT
app.use("/graphql", verifyJwt);

export { app };
