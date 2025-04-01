import uploadFile from "../helpers/uploadFile.js";
import { ApiError } from "../utils/APiError.js";
import AIModel from "../helpers/AIModel.js";
import formatPrompt from "../utils/formatPrompt.js";

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
  throw new ApiError(400, "No pest detected")
};

const predictDisease = async (file) => {
  const [imageResponse, modelResponse] = await Promise.all([
    uploadFile(file),
    AIModel.predictModel(file.buffer, file.mimetype, formatPrompt.diseasePrompt),
  ]);
  if (Object.keys(modelResponse).length > 0) {
    return {
      ...modelResponse,
      imageUrl: imageResponse,
    };
  }
  throw new ApiError(400, "No disease detected")
};

export default {predictPest, predictDisease}