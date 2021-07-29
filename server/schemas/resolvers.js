const {
    User,
    Book
} = require('../models');

const { AuthenticationError} = require('apollo-server-express');

const {signToken} = require('../utils/auth');
const { ASTValidationContext } = require('graphql/validation/ValidationContext');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks')

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        books: async () => {
            return Book.find();
        }
    },
    Mutation: {
        addUser: async (parent, loginInfo) => {
            const user = await User.create(loginInfo);
            const token = signToken(user);

            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { authors, bookId, image, link }, context) => {
            console.log('WE HIT THE SAVE BOOK!', authors, bookId, image, link)
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: {authors, bookId, image, link} } },
                { new: true }
              )
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          }
    }
};

module.exports = resolvers;