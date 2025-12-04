import UserModel from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";

class AuthController {
  register = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const exists = await UserModel.findOne({ email });

      if (exists)
        return res.status(400).json({
          message: "User already exists",
        });

      const user = new UserModel({ name, email, password, role });
      await user.save();

      const token = signToken({ id: user._id, role: user.role });

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (exception) {
      next(exception);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user)
        return res.status(400).json({
          message: "Invalid credentials",
        });

      const match = await user.comparePassword(password);

      if (!match)
        return res.status(400).json({
          message: "Invalid credentials",
        });

      const token = signToken({ id: user._id, role: user.role });

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const authCtrl = new AuthController();
export default authCtrl;
