import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
  componentDidMount() {
  }

  render() {
    const { data } = this.props;
    // console.log(data.length);
    return (
      <div>
        { (data.length < 1) ? 'Nenhum álbum foi encontrado'
          : data.map((item) => (
            <div key={ item.collectionId }>
              <img src={ item.artworkUrl100 } alt={ item.artistName } />
              <p>{item.collectionName}</p>
              <p>{ item.artistName }</p>
              <Link
                data-testid={ `link-to-album-${item.collectionId}` }
                to={ `/album/${item.collectionId}` }
              >
                Ir ao álbum
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

Card.propTypes = {
  data: PropType.arrayOf(PropType.shape({})).isRequired,
};
