import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MovieCard = ({ movie, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Image
        source={{ uri: movie.poster_url }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
      <Text style={styles.type}>{movie.type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    width: 120,
    height: 200,
  },
  poster: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default MovieCard;
