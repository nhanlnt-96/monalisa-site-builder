module.exports = (sequelize, DataTypes) => {
  const About = sequelize.define("About", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
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
    bgImageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bgImageUrl: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
    },
  });
  return About;
};