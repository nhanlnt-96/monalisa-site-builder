module.exports = (sequelize, DataTypes) => {
  const FAQ = sequelize.define("FAQ", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    answer: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  });
  return FAQ;
};