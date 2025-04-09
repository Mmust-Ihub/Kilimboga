import uploadFile from "../helpers/uploadFile.js";
import { ApiError } from "../utils/APiError.js";
import AIModel from "../helpers/AIModel.js";
import formatPrompt from "../utils/formatPrompt.js";
import productModel from "../models/product.model.js";
import mpesa from "../helpers/mpesa.js";
import { blockList, formatPhoneNumber } from "../utils/utils.js";
import orderModel from "../models/order.model.js";
import paymentModel from "../models/payment.model.js";

const predictPest = async (file) => {
  const [imageResponse, modelResponse] = await Promise.all([
    uploadFile(file),
    AIModel.predictModel(file.buffer, file.mimetype, formatPrompt.pestPrompt),
  ]);
  if (Object.keys(modelResponse).length > 0) {
    return {
      ...modelResponse,
      imageUrl: imageResponse,
    };
  }
  throw new ApiError(400, "No pest detected");
};

const predictDisease = async (file) => {
  const [imageResponse, modelResponse] = await Promise.all([
    uploadFile(file),
    AIModel.predictModel(
      file.buffer,
      file.mimetype,
      formatPrompt.diseasePrompt
    ),
  ]);
  if (Object.keys(modelResponse).length > 0) {
    return {
      ...modelResponse,
      imageUrl: imageResponse,
    };
  }
  throw new ApiError(400, "No disease detected");
};

const initiateCheckout = async (user, orders) => {
  const phoneNumber = formatPhoneNumber(user.phoneNumber);
  const { products, totalAmount } = orders;
  if (!products || products.length === 0) {
    throw new ApiError(400, "No products in the cart.");
  }
  for (const item of products) {
    const { productId, quantity } = item;
    const product = await productModel.findById(productId);
    if (!product) {
      throw new ApiError(404, `Product with id ${productId} not found`);
    }
    if (product.quantity < quantity) {
      throw new ApiError(400, `Not enough stock for product: ${product.title}`);
    }
  }
  return await mpesa.initiateStkPush(phoneNumber, totalAmount);
};

const processOrders = async (user, orders, checkoutRequestId) => {
  const { products, address } = orders;
  for (const item of products) {
    const { productId, quantity, amount } = item;
    const product = await productModel.findById(productId);
    // Deduct the stock
    product.quantity -= quantity;
    await product.save();

    // create a new order
    const newOrder = await orderModel.create({
      farmerId: user.id,
      vendorId: item.vendorId,
      products: blockList(item, ["vendorId", "amount"]),
      totalAmount: amount,
      checkoutRequestId,
      paymentStatus: "completed",
      orderAddress: address,
    });

    // create a new transaction
    const newPayment = await paymentModel.create({
      orderId: newOrder.id,
      farmerId: user.id,
      vendorId: item.vendorId,
      checkoutRequestId,
      amount,
      status: "completed",
    });
  }
};

export default { predictPest, predictDisease, initiateCheckout, processOrders };
