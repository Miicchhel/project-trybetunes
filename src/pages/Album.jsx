import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { match: { params : { id } } } = this.props;
    this.fetchGetMusics(id);
  }

  fetchGetMusics = async (id) => {
    const response = await getMusics(id);
    this.setState({
      artistName: response[0].artistName,
      albumName: response[0].collectionName,
      data: response.filter((item, index) => (index !== 0)),
    });
  };

  render() {
    const { data, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{ albumName }</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        {
          data.map((item) => (
            <MusicCard
              key={ item.trackId }
              previewUrl={ item.previewUrl }
              trackName={ item.trackName }
            />
          ))
        }
      </div>
    );
  }
}
