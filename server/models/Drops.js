module.exports = (sequelize, DataTypes) => {
  const Drops = sequelize.define("Drops", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  }, {timestamps: false});
  return Drops;
};