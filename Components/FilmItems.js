// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../api/TMDB_API';
import { connect } from 'react-redux';


class FilmItem extends React.Component {

  displayFavoriteImage() {
    let sourceImage = require('../assets/ic_favorite_border.png');
    if (this.props.favoritesFilms.findIndex(_elt => _elt.id === this.props.film.id) !== -1) {
      sourceImage = require('../assets/ic_favorite.png');
    }
    return (
      <Image
        source={sourceImage}
        style={styles.favorite_image}
      />
    )
  }

  render() {
      // const {film, displayDetailForFilm } = this.props;
      const film = this.props.film;
      const displayDetailForFilm = this.props.displayDetailForFilm;
    return (
      <TouchableOpacity onPress={() => displayDetailForFilm(film.id)} style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path) }}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {this.displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>{film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})


const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.favoritesFilms
  };
}
export default connect(mapStateToProps)(FilmItem);