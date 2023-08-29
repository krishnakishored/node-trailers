'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // - Can have multiple songs.    
      // - Belongs to many artists (many-to-many with artists).
      // Album.belongsToMany(models.Artist, { through: models.ArtistAlbum });
      Album.hasMany(models.Song, { foreignKey: 'album_id', sourceKey: 'id' });
    }
  }
  Album.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    language: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};