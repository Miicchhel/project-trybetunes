import React from 'react';
import PropType from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {

      isLoading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    const { favoriteSongs, trackId } = this.props;
    // console.log(favoriteSongs);
    const checkeMusic = favoriteSongs.find((item) => item.trackId === trackId);
    // console.log(checkeMusic);
    this.setState({ isChecked: checkeMusic });
  }

  checkFavorite = ({ target }) => {
    // console.log(target);
    const check = target.checked;
    if (target.checked) {
      this.addFavoritesSong();
      this.setState({ isChecked: check });
    }
  };

  addFavoritesSong = () => {
    const { songData } = this.props;
    // console.log(songData);
    // this.checkFavorite();
    this.setState(
      { isLoading: true },
      async () => {
        await addSong(songData);
        this.setState({
          isLoading: false,
          // favoriteSongs: allData,
        });
      },
    );
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isLoading, isChecked } = this.state;

    if (isLoading) {
      return <Carregando />;
    }

    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ isChecked }
            id={ trackId }
            // onChange={ () => { this.addFavoritesSong(allData); } }
            onChange={ this.checkFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropType.string,
  trackName: PropType.string,
}.isRequired;
