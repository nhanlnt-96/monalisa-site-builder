module.exports = (sequelize, DataTypes) => {
  const Roadmap = sequelize.define("Roadmap", {
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
    description: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  });
  return Roadmap;
};