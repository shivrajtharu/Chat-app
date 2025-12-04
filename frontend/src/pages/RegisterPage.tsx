import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Person, Email, Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import type { RegisterFormData } from "../types/register.types";
import { registerSchema } from "../validations/registerValidation";
import { useState } from "react";
import apiEndpoints from "../api/apiEndPoints.json";
import api from "../api/axios.config";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useToast();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await api.post(apiEndpoints.auth.register, data);
      notify("Registered Successfully", "success");
      navigate("/login");
    } catch (err) {
      const apiMessage = (err as { response?: { data?: { message?: string } } })
        .response?.data?.message;
      notify(apiMessage || "Registration failed", "error");
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
          Register
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-4">
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name*"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputProps={{
                    startAdornment: <Person style={{ marginRight: 8 }} />,
                  }}
                />
              )}
            />

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

            {/* Role Dropdown */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  fullWidth
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  <MenuItem value="user">user</MenuItem>
                  <MenuItem value="admin">admin</MenuItem>
                </TextField>
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
            {isLoading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
