import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      // allData: [],
      songsData: [],
      favoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchGetMusics(id);
    this.fetchFavoriteSongs(id);
  }

  fetchGetMusics = async (id) => {
    const response = await getMusics(id);
    // console.log(response);
    this.setState({
      artistName: response[0].artistName,
      albumName: response[0].collectionName,
      songsData: response.filter((item, index) => (index !== 0)),
      // allData: response,
    });
  };

  fetchFavoriteSongs = (id) => {
    this.setState(
      { isLoading: true },
      async () => {
        this.setState({
          favoriteSongs: await getFavoriteSongs(id),
          isLoading: false,
        });
      },
    );
  };

  render() {
    const { songsData, artistName, albumName, isLoading, favoriteSongs } = this.state;
    if (isLoading) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{ albumName }</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        {
          songsData.map((item) => (
            <MusicCard
              key={ item.trackId }
              songData={ item }
              favoriteSongs={ favoriteSongs }
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
