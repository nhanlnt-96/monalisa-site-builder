module.exports = (sequelize, DataTypes) => {
  const CollectionsDetail = sequelize.define("Collections_Detail", {
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
  return CollectionsDetail;
};
