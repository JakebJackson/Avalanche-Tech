const { User, Part, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SK);

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    parts: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Part.find(params).populate('category');
    },
    part: async (parent, { _id }) => {
      return await Part.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.parts',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.parts',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, { part }, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ parts: part.map(p => p._id) }); // Extract part IDs
      const line_items = [];
      const { parts: populatedParts } = await order.populate('parts');

      for (let i = 0; i < populatedParts.length; i++) {
        const price = await stripe.prices.create({
          product_data: {
            name: populatedParts[i].name,
            // description: populatedParts[i].description,
            // images: [`${url}/images/${populatedParts[i].image}`]
          },
          unit_amount: populatedParts[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: part.find(p => p._id === populatedParts[i]._id.toString()).purchaseQuantity,
        });
      }


      // Create a checkout session with the line_items array
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { parts }, context) => {
      if (context.user) {
        const order = new Order({ parts });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    updatePart: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Part.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
