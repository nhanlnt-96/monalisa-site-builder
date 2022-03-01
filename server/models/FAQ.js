module.exports = (sequelize, DataTypes) => {
  const FAQ = sequelize.define("FAQ", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    subTitle: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  }, {timestamps: false});
  return FAQ;
};