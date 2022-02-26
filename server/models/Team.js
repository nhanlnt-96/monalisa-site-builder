module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    position: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
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
  return Team;
};