'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lyricists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lyricists.init({
    artist_slug: DataTypes.STRING,
    song_slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lyricists',
  });
  return Lyricists;
};