module.exports = (sequelize, DataTypes) => {
  const AboutImg = sequelize.define("AboutImg", {
    imageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  }, {timestamps: false});
  return AboutImg;
};