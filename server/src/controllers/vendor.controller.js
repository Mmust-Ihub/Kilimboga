import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync.js";
import uploadFile from "../helpers/uploadFile.js";
import productModel from "../models/product.model.js";
import { ApiError } from "../utils/APiError.js";
import { allowList, blockList } from "../utils/utils.js";
import vendorService from "../services/vendor.service.js";
import orderModel from "../models/order.model.js";
import { userModel } from "../models/user.model.js";

const getStats = catchAsync(async (req, res) => {
  const data = await vendorService.stats(req.user.id);
  return res.status(200).json(data);
});

const getProfile = catchAsync(async (req, res) => {
  const user = allowList(req.user, [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "imageUrl",
  ]);
  return res.status(httpStatus.OK).json(user);
});

const editProfile = catchAsync(async (req, res) => {
  if (!req.files?.length === 0) {
    req.body.imageUrl = await uploadFile(req.files[0]);
  }
  const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {$set: req.body}, {new: true, runValidators: true})
  if(!updatedUser){
    return res.status(httpStatus.NOT_FOUND).json({ message: "User not found."})
  }
  return res.status(httpStatus.ACCEPTED).json(updatedUser)
});

const addProduct = catchAsync(async (req, res) => {
  req.body.vendorId = req.user.id;
  const imageUrl = await uploadFile(req.files[0]);
  await productModel.create({ ...req.body, imageUrl });
  return res
    .status(httpStatus.CREATED)
    .json({ status: "success", message: "product created successfully." });
});

const getProducts = catchAsync(async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    let page = parseInt(req.query.page);
    let perPage = parseInt(req.query.perPage);
    const products = await productModel
      .find({ vendorId: req.user.id })
      .skip(page * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return res.status(httpStatus.OK).json(products);
  }
  const allProducts = await productModel
    .find({ vendorId: req.user.id })
    .sort({ createdAt: -1 });
  return res.status(httpStatus.OK).json(allProducts);
});

const editProduct = catchAsync(async (req, res) => {
  if (!req.files?.length === 0) {
    req.body.imageUrl = await uploadFile(req.files[0]);
  }
  const updatedProduct = await productModel.findByIdAndUpdate(
    req.query.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!updatedProduct) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Product not found" });
  }
  return res.status(httpStatus.ACCEPTED).json(updatedProduct);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productModel.findOne({ _id: req.query.id });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "The product does not exist");
  }
  if (String(product.vendorId) !== req.user.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to delete this product"
    );
  }
  await productModel.deleteOne({ _id: product._id });
  return res
    .status(httpStatus.NO_CONTENT)
    .json({ status: "success", message: "product deleted successfully." });
});

const getOrders = catchAsync(async (req, res) => {
  // location, phone number
  const payload = {
    vendorId: 0,
    _id: 0,
  };
  const orders = await orderModel
    .find({ vendorId: req.user.id, deliveryStatus: req.query.state }, payload)
    .populate({path: "farmerId", select: "phoneNumber"})
    .populate({ path: "products.productId", select: "_id title" })
    .sort({ orderedAt: -1 }).lean();

  const modifiedOrders = orders.map((order) => {
    let finalOrder = blockList(order, ["farmerId", "orderedAt", "createdAt", "updatedAt"])
    const modifiedProducts = order.products.map((productItem) => {
      return {
        product: {
          _id: productItem.productId?._id,
          title: productItem.productId?.title,

        },
        quantity: productItem.quantity,
        price: productItem.price,
      };
    });
    return {
      ...finalOrder,
      farmerPhoneNumber: order.farmerId?.phoneNumber,
      products: modifiedProducts,
    };
  });
  return res.status(httpStatus.OK).json(modifiedOrders);
});

export default {
  getStats,
  getProfile,
  editProfile,
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getOrders,
};
