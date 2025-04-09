import { ApiError } from "../utils/APiError.js";
import {
  accountApprovalEmail,
  accountRestorationEmail,
  accountSuspensionEmail,
} from "../utils/formatEmail.js";
import moment from "moment";
import httpStatus from "http-status";
import { sendEmail } from "../utils/utils.js";

// service to manage users
const manage = async (action, user) => {
  const payload = {
    firstName: user.firstName,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
  };
  if (action === "approve") {
    if (user.isApproved) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User is already approved");
    }
    user.isApproved = true;
    await user.save();
    const email = accountApprovalEmail({
      ...payload,
      approvalDate: moment().toString(),
    });
    await sendEmail({ ...email, to: user.email });
    return "Account approved successfully";
  } else if (action === "suspend") {
    user.isSuspended = true;
    await user.save();
    const suspensionEmail = accountSuspensionEmail({
      ...payload,
      suspensionDate: moment().toString(),
      suspensionReason: "Failure to comply to kilimboga rules and regulations",
    });
    await sendEmail({ ...suspensionEmail, to: user.email });
    return "Account suspended successfully";
  }
  // restore the account
  else {
    user.isSuspended = false;
    await user.save();
    const restorationEmail = accountRestorationEmail({
      ...payload,
      restorationDate: moment().toString(),
    });
    await sendEmail({ ...restorationEmail, to: user.email });
    return "Account restored successfully";
  }
};

export default { manage };
