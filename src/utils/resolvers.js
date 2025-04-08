import { User } from "../models/user.model.js";
import { Item } from "../models/item.model.js";
import { Bill } from "../models/bill.model.js";
import { uploadOnCloudinary } from "./cloudinary.js";
import { generateAccessAndRefreshTokens } from "./generateRefreshAndAccessToken.js";
import { ApiError } from "./ApiError.js";

const resolvers = {
  Query: {
    getAllItems: async () => {
      return await Item.find();
    },
    getItemById: async (_, { id }) => {
      return await Item.findById(id);
    },
    getUserById: async (_, { id }) => {
      return await User.findById(id);
    },
    getAllBills: async () => {
      return await Bill.find().populate("items.productId");
    },
  },
  Mutation: {
    addItem: async (_, { name, quantity, price }) => {
      const existingItem = await Item.findOne({ name });

      if (existingItem) {
        throw new ApiError(400, "Item already exists");
      }

      const newItem = await Item.create({
        name,
        quantity,
        price,
      });

      return newItem;
    },
    updateItem: async (_, { id, quantity, price }) => {
      const item = await Item.findById(id);

      if (!item) {
        throw new ApiError(404, "Item not found");
      }

      item.quantity += quantity;
      item.price = price;

      const updatedItem = await item.save();
      return updatedItem;
    },
    createBill: async (_, { items }) => {
      let totalAmount = 0;
      const billItems = [];

      for (let item of items) {
        const dbItem = await Item.findById(item.id);

        if (!dbItem || dbItem.quantity < item.quantity) {
          throw new ApiError(400, "Insufficient quantity");
        }

        dbItem.quantity -= item.quantity;
        await dbItem.save({ validateBeforeSave: false });

        totalAmount += dbItem.price * item.quantity;

        billItems.push({
          productId: dbItem._id,
          quantity: item.quantity,
          name: dbItem.name,
        });
      }

      const bill = await Bill.create({
        items: billItems,
        totalAmount,
      });

      return bill;
    },
    registerUser: async (_, { fullname, username, email, password, image }) => {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        throw new ApiError(404, "User Already exists");
      }

      const userImage = await uploadOnCloudinary(image);

      const newUser = await User.create({
        fullname,
        username,
        email,
        password,
        image: userImage?.url,
      });

      return newUser;
    },
    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new ApiError(404, "User does not exist");
      }

      const isPasswordValid = await user.isPasswordCorrect(password);

      if (!isPasswordValid) {
        throw new ApiError(404, "Invalid password");
      }

      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

      return { user, accessToken, refreshToken };
    },
  },
};

export default resolvers;
