'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.Album, { foreignKey: 'album_slug', targetKey: 'slug' })
    }
  }
  Song.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    language: DataTypes.STRING,
    year: DataTypes.INTEGER,
    album_name: DataTypes.STRING,
    summary: DataTypes.JSON,
    lyrics: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};