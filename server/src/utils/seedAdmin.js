import config from "../config/config.js";
import { userModel } from "../models/user.model.js";
import allRoles from "../config/roles.js";
import logger from "../config/logger.js";

const seedAdmin = async () => {
  try {
    const adminExists = await userModel.findOne({ role: allRoles.ADMIN });
    if (!adminExists) {
      const adminInfo = {
        ...config.admin,
        role: allRoles.ADMIN,
        isVerified: true,
        isSpecial: true,
        isApproved: true,
      };
      await userModel.create(adminInfo);
      if (config.env == "development") {
        logger.info("Admin user seeded successfully");
      }
    }
  } catch (error) {
    logger.error(`Error seeding admin: ${error.message}`);
  }
};

export default seedAdmin