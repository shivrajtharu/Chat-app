import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";

class StatsController {
  totalMessage = async (req, res, next) => {
    try {
      const totalMessages = await MessageModel.countDocuments();
      res.json({
        totalMessages,
      });
    } catch (exception) {
      next(exception);
    }
  };

  totalUsers = async (req, res, next) => {
    try {
      const totalUsers = await UserModel.countDocuments();
      res.json({
        totalUsers,
      });
    } catch (exception) {
      next(exception);
    }
  };

  summary = async (req, res, next) => {
    try {
      const [totalMessages, totalUsers] = await Promise.all([
        MessageModel.countDocuments(),
        UserModel.countDocuments(),
      ]);

      res.json({ totalMessages, totalUsers });
    } catch (exception) {
      next(exception);
    }
  };
}

const statsCtrl = new StatsController();
export default statsCtrl;
