import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Token {
    accessToken: String!
    refreshToken: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    fullname: String!
    image: String!
  }

  type BillItem {
    productId: Item!
    quantity: Int!
    name: String!
  }

  type Item {
    _id: ID!
    name: String!
    quantity: Int!
    price: Float!
  }

  type Bill {
    _id: ID!
    items: [BillItem!]!
    totalAmount: Float!
  }

  type Query {
    getAllItems: [Item!]!
    getItemById(id: ID!): Item
    getUserById(id: ID!): User
    getAllBills: [Bill!]!
  }

  type Mutation {
    addItem(name: String!, quantity: Int!, price: Float!): Item!
    updateItem(id: ID!, quantity: Int!, price: Float!): Item!
    createBill(items: [ItemInput!]!): Bill!
    registerUser(
      fullname: String!
      username: String!
      email: String!
      password: String!
      image: String!
    ): User!
    loginUser(username: String!, password: String!): LoginResponse!
  }

  type LoginResponse {
    user: User!
    tokens: Token!
  }

  input ItemInput {
    id: ID!
    quantity: Int!
  }
`;
