module.exports = (sequelize, DataTypes) => {
  const HowWork = sequelize.define("HowWork", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    detail1: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    detail2: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    detail3: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    detail4: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
    detail5: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  });
  return HowWork;
};