module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarImgName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    isFirstLogin: {
      defaultValue: Boolean(true),
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return User;
};