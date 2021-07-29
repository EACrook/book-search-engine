import { gql } from "@apollo/client"

export const SIGN_UP = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String!], $bookId: ID!, $image: String!, $link: String!){
        saveBook(authors: $authors, bookId: $bookId, image: $image, link: $link) {
                _id
                username
                email
                bookCount
                savedBooks{
                    bookId
                    authors
                    description
                    image
                    link
                    title
                }
        }
    }
`;