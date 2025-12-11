import sequelize from "./index";
import { UserInstance } from "../src/entites/UserAttributes";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";





const User = sequelize.define<UserInstance>("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    });

// ✅ Hook : hash avant création
User.beforeCreate(async (user: UserInstance) => {
    user.password = await bcrypt.hash(user.password, 10);
});


User.beforeUpdate(async (user: UserInstance) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});


(User as any).prototype.checkPassword = function (
    this: UserInstance,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};


export default User;
