import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const AuthService = {
  async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error("Name, email, dan password wajib diisi");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Format email tidak valid");
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password harus minimal 8 karakter dan mengandung huruf besar, angka, serta simbol."
      );
    }

    const existingUser = await AuthRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AuthRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  },

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email dan password wajib diisi");
    }

    const user = await AuthRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  },

  async me(userId: number) {
    const user = await AuthRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
};