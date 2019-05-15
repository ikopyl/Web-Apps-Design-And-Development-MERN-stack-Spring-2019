const assert = require('assert');
const mongoose = require('mongoose');
const {
  SearchResultSchema,
  MusicAlbumSchema
} = require('../microservices/models/lookupmusicbandModel');

/* Pre-requisite: MongoDB needs to be up and running!!! */
/* Note: the collection name defaults to a pluralization of the Mongoose model name */

/**  creating MusicAlbum collection and leveraging MusicAlbumSchema for it */
const MusicAlbum = mongoose.model('MusicAlbums', MusicAlbumSchema);
/**  creating SearchResults collection and leveraging SearchResultsSchema for it */
const SearchResult = mongoose.model('SearchResults', SearchResultSchema);

const musicAlbum1 = {
  description: 'The Beatles - Abbey Road',
  albumName: 'Abbey Road',
  artistName: 'The Beatles',
  artworkUrl:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/100x100bb.jpg',
  artworkUrlTiny:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/64x64bb.jpg',
  artworkUrlSmaller:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/100x100bb.jpg',
  artworkUrlSmall:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/170x170bb.jpg',
  artworkUrlMedium:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/340x340bb.jpg',
  artworkUrlLarge:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/600x600bb.jpg',
  artworkUrlLarger:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/1200x1200bb.jpg',
  artworkUrlEnormous:
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/1400x1400bb.jpg'
};

const musicAlbum2 = {
  description: 'The Beatles - Let It Be',
  albumName: 'Let It Be',
  artistName: 'The Beatles',
  artworkUrl:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/100x100bb.jpg',
  artworkUrlTiny:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/64x64bb.jpg',
  artworkUrlSmaller:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/100x100bb.jpg',
  artworkUrlSmall:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/170x170bb.jpg',
  artworkUrlMedium:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/340x340bb.jpg',
  artworkUrlLarge:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/600x600bb.jpg',
  artworkUrlLarger:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/1200x1200bb.jpg',
  artworkUrlEnormous:
    'https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/1400x1400bb.jpg'
};

// Describe our tests
describe('Testing the nested records in lookupmusicbandModel', () => {
  // Connect to db before tests run
  before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/lookupMusicBandTest', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    mongoose.connection
      .once('open', () => {
        console.log(
          'Database connection has been made, now proceeding to the tests...'
        );
        done();
      })
      .on('error', (error) => {
        console.log('Connection error:', error);
      });
  });

  // closing mongoose connection after all tests are executed
  after((done) => {
    return mongoose.disconnect(done);
  });

  afterEach((done) => {
    // drop the collection after each test
    mongoose.connection.collections.searchresults.drop(() => {
      done();
    });
  });

  it('Creates a search result with sub-documents', (done) => {
    const newRecord = new SearchResult({
      search_query: 'The Beatles',
      music_albums: [musicAlbum1, musicAlbum2]
    });

    newRecord.save().then(() => {
      SearchResult.findOne({
        search_query: 'The Beatles'
      }).then((record) => {
        assert(record.music_albums.length === 2);
        done();
      });
    });
  });

  it('Adds another music album to the search result with sub-documents', (done) => {
    const newRecord = new SearchResult({
      search_query: 'The Beatles',
      music_albums: [musicAlbum1]
    });

    newRecord.save().then(() => {
      SearchResult.findOneAndUpdate({
        search_query: 'The Beatles'
      }).then((record) => {
        // add another music album to the search_results array
        record.music_albums.push(musicAlbum2);
        record.save().then(() => {
          SearchResult.findOne({
            search_query: 'The Beatles'
          }).then((updatedRecord) => {
            assert(updatedRecord.music_albums.length === 2);
            done();
          });
        });
      });
    });
  });

  it('Queries a non-existent record', (done) => {
    const search_result = SearchResult.find({
      search_query: 'The Doors'
    }).then((records) => {
      assert(records.length === 0);
      done();
    });
  });

  it('Queries an existent record', (done) => {
    const newRecord = new SearchResult({
      search_query: 'The Doors',
      music_albums: [musicAlbum1]
    });

    newRecord.save().then(() => {
      SearchResult.find({
        search_query: 'The Doors'
      }).then((records) => {
        assert(records.length === 1);
        done();
      });
    });
  });

  it('No duplicate records with the same search_query are created', (done) => {
    const newRecord = new SearchResult({
      search_query: 'The Doors',
      music_albums: [musicAlbum1]
    });

    newRecord.save().then(() => {
      SearchResult.findOne({
        search_query: 'The Doors'
      }).then((record) => {
        const recordId = record._id;
        console.log(recordId);

        const anotherNewRecord = new SearchResult({
          search_query: 'The Doors',
          music_albums: [musicAlbum1],
          _id: recordId
        });

        anotherNewRecord
          .updateOne()
          .then(() => {
            SearchResult.find({
              search_query: 'The Doors'
            }).then((records) => {
              assert(records.length === 1);
              done();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  });
});
