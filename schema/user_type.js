const graphql = require('graphql')
const UserModel = require('../models/userModel')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean
} = graphql


const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type : GraphQLID },
        email: { type: GraphQLString },
        first_name: { type : GraphQLString },
        last_name: { type : GraphQLString },
        avatar: { type : GraphQLString },
        active: { type : GraphQLBoolean },
        privacy: { type : GraphQLInt},
        // This will query the users podcasts?
        podcasts: { type: GraphQLString }
    })
})

module.exports = UserType