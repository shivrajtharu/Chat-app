import UserModel from "../models/user.model.js";

class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      const users = await UserModel.find().select("-password");
      res.json(users);
    } catch (exception) {
      next(exception);
    }
  };

  getSingleUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (req.user.role !== "admin" && req.user._id.toString() !== id)
        return res.status(403).json({
          message: "Forbidden",
        });

      const user = await UserModel.findById(id).select("-password");

      if (!user)
        return res.status(404).json({
          message: "Not found",
        });

      res.json(user);
    } catch (exception) {
      next(exception);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (req.user.role !== "admin" && req.user._id.toString() !== id)
        return res.status(403).json({
          message: "Forbidden",
        });

      const update = req.body;
      delete update.password;
      const user = await UserModel.findByIdAndUpdate(id, update, {
        new: true,
      }).select("-password");

      res.json(user);
    } catch (exception) {
      next(exception);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (req.user.role !== "admin" && req.user._id.toString() !== id)
        return res.status(403).json({
          message: "Forbidden",
        });

      await UserModel.findByIdAndDelete(id);
      res.json({
        message: "Deleted",
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const userCtrl = new UserController();
export default userCtrl;
