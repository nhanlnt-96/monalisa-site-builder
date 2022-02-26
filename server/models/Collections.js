module.exports = (sequelize, DataTypes) => {
  const Collections = sequelize.define("Collections", {
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
  });
  return Collections;
};
