module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define("Spot", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  }, {timestamps: false});
  return Spot;
};