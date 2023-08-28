'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtistAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArtistAlbum.init({
    artist_slug: DataTypes.STRING,
    album_slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ArtistAlbum',
  });
  return ArtistAlbum;
};