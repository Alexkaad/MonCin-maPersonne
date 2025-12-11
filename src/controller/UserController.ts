import { Request, Response } from "express";
import {generateToken, registerUser} from "../services/UserService";
import User from "../../models/Users";
import bcrypt from "bcrypt";



export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Vérification des champs
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Générer le token
        const token = generateToken(user);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                email: user.email,
            },
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}



export async function registerController(req: Request, res: Response) {
    try {
        const { name, firstName, email, password } = req.body;


        const user = await registerUser({
            name,
            firstName,
            email,
            password,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                email: user.email,
            },
        });

    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}
