import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      allData: [],
      songsData: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchGetMusics(id);
  }

  fetchGetMusics = async (id) => {
    const response = await getMusics(id);
    // console.log(response);
    this.setState({
      artistName: response[0].artistName,
      albumName: response[0].collectionName,
      songsData: response.filter((item, index) => (index !== 0)),
      allData: response,
    });
  };

  render() {
    const { songsData, allData, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{ albumName }</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        {
          songsData.map((item) => (
            <MusicCard
              key={ item.trackId }
              songsData={ item }
              allData={ allData }
              previewUrl={ item.previewUrl }
              trackName={ item.trackName }
              trackId={ item.trackId }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  math: PropType.shape({
    params: PropType.shape({
      id: PropType.string,
    }),
  }),
}.isRequired;
