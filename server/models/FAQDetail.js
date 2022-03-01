module.exports = (sequelize, DataTypes) => {
  const FAQDetail = sequelize.define("FAQDetail", {
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
  }, {timestamps: false});
  return FAQDetail;
};