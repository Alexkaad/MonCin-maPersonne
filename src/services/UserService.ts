
import {UserAttributes, UserInstance} from "../entites/UserAttributes";
import User from "../../models/Users";
import jwt from "jsonwebtoken";

export async function login(email: string, password: string) {
    const user = await User.findOne({ where: { email } }) as UserInstance;

    if (!user) {
        throw new Error("User not found");
    }

    const isValid = await user.checkPassword(password);

    if (!isValid) {
        throw new Error("Invalid password");
    }

    return user;
}

export function generateToken(user: UserInstance) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: 60 * 60 * 3,
        }
    );
}

export async function registerUser(data: Partial<UserAttributes>) {

    if (!data.email) {
        throw new Error("Email is required");
    }
    if (!data.password) {
        throw new Error("Password is required");
    }
    if (!data.name) {
        throw new Error("Name is required");
    }
    if (!data.firstName) {
        throw new Error("First name is required");
    }

    // ✅ Vérifier si l'email existe déjà
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) {
        throw new Error("Email already in use");
    }

    // ✅ Création (le hook beforeCreate hash le password)
    const user = await User.create({
        name: data.name,
        firstName: data.firstName,
        email: data.email,
        password: data.password,
    });

    return user;
}
