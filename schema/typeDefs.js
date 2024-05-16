const typeDefs = `#graphql

# User Types:
type Users {
    id: ID
    name: String
    age: Int
    email: String
    password: String
    userinfo: Userinfo # Relationship field to Userinfo type
}

type Userinfo {
    id: ID
    address: String
    stripe_card: Int
    user_id: ID # User ID for relationship

    # Define a field to resolve the relationship with Users
    user: Users
}

# Query Types
type Query {
    users: [Users]
    user(id: ID): Users
    userinfo(id: ID): Userinfo
}

# Mutation Types
type Mutation {
    createUser(user: AddUser): Users
    createUserInfo(userinfo: AddUserinfo): Userinfo
    updateUser(id: ID, user: UpdateUser): Users
    updateUserInfo(id: ID, userinfo: UpdateUserinfo): Userinfo
}

input AddUser {
    name: String
    age: Int
    email: String
    password: String
}

input AddUserinfo {
    address: String
    stripe_card: Int
    user_id: ID
}

input UpdateUser {
    name: String
    age: Int
    email: String
    password: String
}

input UpdateUserinfo {
    address: String
    stripe_card: Int
    user_id: String
}

`;

export { typeDefs };
