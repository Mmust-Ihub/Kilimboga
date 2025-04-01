import { greenHouseModel } from "../models/farmer.model.js";
import { actionRequiredEmail } from "../utils/formatEmail.js";
import { sendEmail } from "../utils/utils.js";

const detectActionRequired = (sensorData, thresholds) => {
  const { temperature, humidity, moisture } = sensorData;
  let actions = [];

  if (temperature >= thresholds.temperature) {
    actions.push("Temperature is above threshold. Starting the fan ..");
  }

  if (moisture < thresholds.moisture) {
    actions.push("Moisture is below threshold. Turning irrigation ON..");
  }
  return actions.length
    ? { status: "ALERT", actions }
    : { status: "NORMAL", message: "All conditions are within normal limits." };
};

const process = async (data) => {
  const pipeline = [
    { $match: { farmId: data.farmId } },
    {
      $lookup: {
        from: "users",
        localField: "farmerId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    {
      $project: {
        _id: 0,
        email: "$userDetails.email",
        name: "$userDetails.firstName",
      },
    },
  ];
  const { status, actions } = detectActionRequired(data.stats, data.thresholds);
  if (status == "ALERT") {
    const info = await greenHouseModel.aggregate(pipeline);
    const { email, name } = info[0];
    const actionPayload = actionRequiredEmail(name, actions)
    console.log(actions)
    await sendEmail({to: email, ...actionPayload})
  }
};

export default { process };
