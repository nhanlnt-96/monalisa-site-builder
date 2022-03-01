module.exports = (sequelize, DataTypes) => {
  const RoadmapDetail = sequelize.define("RoadmapDetail", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phaseDesc: {
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
  }, {timestamps: false});
  return RoadmapDetail;
};