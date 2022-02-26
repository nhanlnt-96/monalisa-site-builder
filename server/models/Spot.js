module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define("Spot", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false,
    },
    btnName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Spot;
};