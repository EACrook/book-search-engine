// import gql
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
    type Book {
        bookId: Int
        authors: String
        description: String
        image: String
        link: String
        title: String
    }

    type Query {
        books: Book
        me: User
    }

    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: String!, bookId: ID, image: String!, link: String!): User
        removeBook(bookId: ID): User
    }
`;

//export typeDefs
module.exports = typeDefs;