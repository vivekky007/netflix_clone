import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { movie } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.details}>
        <Text style={styles.info}>Language: </Text>
        {movie.language}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.info}>Genres: </Text>
        {movie.genres.join(', ')}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.info}>Premiered: </Text>
        {movie.premiered}
      </Text>
      <Text style={styles.summary}>
        {movie.summary?.replace(/<[^>]*>/g, '')}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: '100%', padding: 10, backgroundColor: 'red' },
  image: { width: '100%', height: 500, borderRadius: 5, marginBottom: 10 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    color: '#F5F5F5',
  },
  details: { fontSize: 16, marginBottom: 5, color: '#F5F5F5' },
  summary: { fontSize: 14, color: '#F5F5F5' },
  info: { fontWeight: 'bold' ,color:'#E0E0E0'},
});
