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
      // define association here
      Song.belongsTo(models.Album, { targetKey: 'slug', foreignKey: 'album_slug', onDelete: 'CASCADE' })
      Song.belongsToMany(models.Artist, { through: models.ArtistSong });
    }
  }
  Song.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    summary: DataTypes.JSON,
    lyrics: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};