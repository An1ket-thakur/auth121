import { sequelize } from "../config/sequelize";
import { DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  tokenVersion: number;
  resetPasswordToken: string;
  resetPasswordExpiry: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "isEmailVerified"
    | "resetPasswordExpiry"
    | "twoFactorSecret"
    | "twoFactorEnabled"
    | "tokenVersion"
    | "resetPasswordToken"
    | "role"
    | "id"
  > {}

const UserModel = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isLowercase: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["user", "admin"]],
      },
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokenVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export { UserModel };
