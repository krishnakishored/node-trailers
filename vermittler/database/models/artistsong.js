'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArtistSong.init({
    artist_slug: DataTypes.STRING,
    song_slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ArtistSong',
  });
  return ArtistSong;
};