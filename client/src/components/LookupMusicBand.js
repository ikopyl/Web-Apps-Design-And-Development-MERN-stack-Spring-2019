import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  searchAlbums,
  saveToDB,
  loadFromDB,
  checkIfBandInDB,
  updateSearchString
} from '../redux/actions/lookupMusicBandActions';

import '../style/LookupMusicBand.css';

class LookupMusicBand extends Component {
  renderImage = (imageUrl, description, index) => {
    const moreInfoUrl = `http://www.google.com/search?q=${description +
      ' album wiki'}&btnI`;
    return (
      <div style={flexContainerStyle} key={index}>
        <a href={moreInfoUrl} target="_blank" rel="noopener noreferrer">
          <ReactTooltip delayShow={500} />
          <img src={imageUrl} alt={description} data-tip={description} />
        </a>
      </div>
    );
  };

  onSubmit = (propFunc) => (e) => {
    e.preventDefault();
    propFunc();
    this.props.updateSearchString('');
  };

  onChange = (propFunc) => (e) => {
    this.props.updateSearchString(e.target.value);
    propFunc();
  };

  render() {
    const musicAlbums = (
      <div className={{ display: 'flex', flexWrap: 'nowrap' }}>
        <form
          onSubmit={this.onSubmit(this.props.searchAlbums)}
          style={{ display: 'flex' }}
        >
          <input
            type="text"
            name="bandName"
            style={{ flex: '10', padding: '5px' }}
            placeholder="Please enter a band name..."
            onChange={this.onChange(this.props.checkIfBandInDB)}
            value={this.props.searchString}
          />
          <input
            type="submit"
            value="Search iTunes API"
            className="btn"
            style={{ flex: '1' }}
          />
        </form>

        {!this.props.btnSaveToDBHidden && (
          <form
            onSubmit={this.onSubmit(this.props.saveToDB)}
            style={{ display: 'flex' }}
          >
            <input
              type="submit"
              value="Save to DB"
              className="btn"
              style={{ flex: '1', padding: '5px' }}
            />
          </form>
        )}

        {!this.props.btnLoadFromDBHidden && (
          <form
            onSubmit={this.onSubmit(this.props.loadFromDB)}
            style={{ display: 'flex' }}
          >
            <input
              type="submit"
              value="Load from DB"
              className="btn"
              style={{ flex: '1', padding: '5px' }}
            />
          </form>
        )}

        <div style={flexContainerStyle} rendered={this.props.albums}>
          {this.props.albums &&
            this.props.albums.map((album, index) =>
              this.renderImage(album.artworkUrlSmall, album.description, index)
            )}
        </div>
      </div>
    );
    return musicAlbums;
  }
}

const flexContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap'
};

LookupMusicBand.propTypes = {
  searchAlbums: PropTypes.func.isRequired,
  saveToDB: PropTypes.func.isRequired,
  loadFromDB: PropTypes.func.isRequired,
  checkIfBandInDB: PropTypes.func.isRequired,
  updateSearchString: PropTypes.func.isRequired,

  bandName: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  albums: PropTypes.array.isRequired,
  savedInDB: PropTypes.bool.isRequired,
  savedRecordId: PropTypes.string.isRequired,
  btnSaveToDBHidden: PropTypes.bool.isRequired,
  btnLoadFromDBHidden: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  // musicSearch - the label of lookupMusicBandReducer,
  // specified under ./client/src/redux/reducers/index.js
  bandName: state.musicSearch.bandName,
  searchString: state.musicSearch.searchString,
  albums: state.musicSearch.albums,
  savedInDB: state.musicSearch.savedInDB,
  savedRecordId: state.musicSearch.savedRecordId,
  btnSaveToDBHidden: state.musicSearch.btnSaveToDBHidden,
  btnLoadFromDBHidden: state.musicSearch.btnLoadFromDBHidden
});

const mapDispatchToProps = {
  searchAlbums,
  saveToDB,
  loadFromDB,
  checkIfBandInDB,
  updateSearchString
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LookupMusicBand);
