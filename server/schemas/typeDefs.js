const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Part {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
    clientName: String
    notes: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    parts(category: ID, name: String): [Part]
    part(_id: ID!): Part
    user: User
    order(_id: ID!): Order
    checkout(part: [ProductInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updatePart(_id: ID!, quantity: Int!): Part
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;