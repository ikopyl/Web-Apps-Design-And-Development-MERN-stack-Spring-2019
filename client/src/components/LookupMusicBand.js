import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchAlbums } from '../redux/actions/lookupMusicBandActions';

import '../style/LookupMusicBand.css';

class LookupMusicBand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: '',
      albums: ''
    };
  }

  renderImage = (imageUrl, description, index) => {
    const moreInfoUrl = `http://www.google.com/search?q=${description +
      ' wiki'}&btnI`;
    return (
      <div style={flexContainerStyle} key={index}>
        <a href={moreInfoUrl} target="_blank" rel="noopener noreferrer">
          <ReactTooltip delayShow={500} />
          <img src={imageUrl} alt={description} data-tip={description} />
        </a>
      </div>
    );
  };

  onSubmit = e => {
    e.preventDefault();

    console.log('this.props.bandName:');
    console.log(this.state.bandName);
    this.props.searchAlbums(this.state.bandName);

    this.setState({
      bandName: ''
    });

  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value // setting the bandname to whatever we type in
    });
  };

  render() {
    const musicAlbums = (
      <div>
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
          <input
            type="text"
            name="bandName"
            style={{ flex: '10', padding: '5px' }}
            placeholder="Please enter a band name..."
            value={this.state.bandName}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: '1' }}
          />
        </form>
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
  bandName: PropTypes.string.isRequired,
  albums: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  // musicSearch - the label of lookupMusicBandReducer, 
  // specified under ./client/src/redux/reducers/index.js
  bandName: state.musicSearch.bandName,
  albums: state.musicSearch.albums
});

const mapDispatchToProps = {
  searchAlbums,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LookupMusicBand);
