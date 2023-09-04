'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Artist.belongsToMany(models.Album, { through: models.ArtistAlbum });
      // Artist.belongsToMany(models.Song, { through: models.ArtistSong });
      Artist.belongsToMany(models.Song, {
        through: 'ArtistSungSongs',
        as: 'sungSongs',
        foreignKey: 'artistId',
      });
      Artist.belongsToMany(models.Song, {
        through: 'ArtistWrittenSongs',
        as: 'writtenSongs',
        foreignKey: 'artistId',
      });
      Artist.belongsToMany(models.Song, {
        through: 'ArtistComposedSongs',
        as: 'composedSongs',
        foreignKey: 'artistId',
      });

      // Artist.belongsToMany(models.Song, { through: 'Singer', as: 'SungSongs', foreignKey: 'artist_slug', otherKey: 'song_slug' });
      // Artist.belongsToMany(models.Song, { through: 'Lyricist', as: 'WrittenSongs', foreignKey: 'artist_slug', otherKey: 'song_slug' });
      // Artist.belongsToMany(models.Song, { through: 'MusicDirector', as: 'ComposedSongs', foreignKey: 'artist_slug', otherKey: 'song_slug' });
    }
  }
  Artist.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
    // timestamps: true,
    // hooks: {
    //   beforeCreate: (artist, options) => {
    //     artist.slug = artist.name.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
    //   },
    //   beforeBulkCreate: (artists, options) => {
    //     artists.forEach(artist => {
    //       artist.slug = artist.name.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
    //     });
    //   }
    // }
  });
  return Artist;
};