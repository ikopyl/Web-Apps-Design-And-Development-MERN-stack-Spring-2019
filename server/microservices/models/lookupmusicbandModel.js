const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const MusicAlbumSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  albumName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  artworkUrl: {
    type: String,
    required: true
  },
  artworkUrlTiny: {
    type: String,
    required: true
  },
  artworkUrlSmaller: {
    type: String,
    required: true
  },
  artworkUrlSmall: {
    type: String,
    required: true
  },
  artworkUrlMedium: {
    type: String,
    required: true
  },
  artworkUrlLarge: {
    type: String,
    required: true
  },
  artworkUrlLarger: {
    type: String,
    required: true
  },
  artworkUrlEnormous: {
    type: String,
    required: true
  }
});

const SearchResultSchema = new Schema({
  created_date: {
    type: Date,
    default: Date.now
  },
  search_query: {
    type: String,
    index: true,
    required: true,
    unique: true,
    dropDups: true
  },
  music_albums: [MusicAlbumSchema]
});

MusicAlbumSchema.plugin(uniqueValidator);
SearchResultSchema.plugin(uniqueValidator);

SearchResultSchema.index({ search_query: 1, type: -1 }, { unique: true });

/**  creating musicalbums collection and leveraging MusicAlbumSchema for it */
const MusicAlbum = mongoose.model('musicalbums', MusicAlbumSchema);
/**  creating searchresults collection and leveraging SearchResultsSchema for it */
const SearchResult = mongoose.model('searchresults', SearchResultSchema);

module.exports = {
  MusicAlbum,
  SearchResult
};
