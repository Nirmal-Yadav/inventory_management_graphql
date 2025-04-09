// index.js
import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { typeDefs } from "./utils/schema.graphql.js";
import resolvers from "./utils/resolvers.js";
import { getUserFromToken } from "./utils/getUserFromToken.js";
import { ApolloServer } from "apollo-server-express";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log("server running on port ", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("mongo db connection failed");
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const user = await getUserFromToken(token);

    console.log(user, "app");
    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      `🚀 Server running at http://localhost:4000${server.graphqlPath}`
    );
  });
}

startServer();
