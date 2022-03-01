module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define("Banner", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    connectBtnName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bgImageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bgImageUrl: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  }, {timestamps: false});
  return Banner;
};
