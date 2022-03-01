module.exports = (sequelize, DataTypes) => {
  const About = sequelize.define("About", {
    title: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
      
    },
    content: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true,
      
    },
  }, {timestamps: false});
  About.associate = (models) => {
    About.hasMany(models.AboutImg, {
      onDelete: "cascade",
    });
  };
  return About;
};