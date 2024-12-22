import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false); // To track if searchMovies is called

  const searchMovies = () => {
    setSearched(true); // Mark that search has been performed
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    axios
      .get(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => setResults(response.data))
      .catch((error) => console.error(error));
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate('Details', { movie: item.show })}
    >
      <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.show.name}</Text>
      <Text numberOfLines={2} style={styles.summary}>
        {item.show.summary?.replace(/<[^>]*>/g, '')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/search.png' }}
          style={styles.icon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Movies..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setSearched(false); // Reset search state while typing
          }}
          onSubmitEditing={searchMovies}
        />
      </View>

      {searched && results.length === 0 ? (
        <Text style={styles.noMoviesText}>No Movie found for "{query}"</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={renderMovie}
          keyExtractor={(item) => item.show.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: 'red' },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  movieContainer: {
    marginBottom: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
    backgroundColor: 'rgb(0,0,15)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'white',
    letterSpacing: 2,
    padding: 5,
    textAlign: 'left',
    width: '100%',
  },
  summary: {
    fontSize: 14,
    color: 'white',
    padding: 5,
    textAlign: 'left',
    width: '100%',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  noMoviesText: {
    fontSize: 18,
    color: 'white',
    letterSpacing: 1.2,
    padding: 100,
    textAlign: 'center',
    marginTop: 20,
  },
});
