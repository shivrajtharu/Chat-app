import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Email, Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import api from "../api/axios.config";
import apiEndpoints from "../api/apiEndPoints.json";
import { loginSchema } from "../validations/loginValidation";
import type { LoginFormData } from "../types/login.types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useToast();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post(apiEndpoints.auth.login, data);
      notify("Login successful!", "success");
      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/chat");
    } catch (err) {
      const apiMessage = (err as { response?: { data?: { message?: string } } })
        .response?.data?.message;
      notify(apiMessage || "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-3">
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          className="text-center font-bold mb-6"
        >
          Login
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email*"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: <Email style={{ marginRight: 8 }} />,
                  }}
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password*"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: <Lock style={{ marginRight: 8 }} />,
                  }}
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
