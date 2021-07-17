// import gql
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
    type Query {
        me: User
    }
`;

//export typeDefs
module.exports = typeDefs;