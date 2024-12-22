import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';


export default function HomeScreen({navigation}) {
  const [movies, setMovies] = useState([]);
  const {width} = Dimensions.get('window'); 
  const bannerHeight = 350;

  useEffect(() => {
    axios
      .get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  const renderMovie = item => (
    <TouchableOpacity
      key={item.show.id}
      style={styles.movieContainer}
      onPress={() => navigation.navigate('Details', {movie: item.show})}>
      <Image source={{ uri: item.show.image?.medium }} resizeMode="contain" style={[styles.thumbnail, { height: bannerHeight }]} />
      <Text style={styles.title}>{item.show.name}</Text>
      <Text numberOfLines={2} style={styles.summary}>
        {item.show.summary?.replace(/<[^>]*>/g, '')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/search.png' }} 
          style={styles.icon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Movies..."
          onFocus={() => navigation.navigate('Search')}
        />


      </View>
      

      <View style={styles.HeadomgContainer}>
        <Text style={styles.HeadingText}>Trendings</Text>
      </View>
      <ScrollView
        horizontal
        style={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        disableIntervalMomentum
        snapToAlignment="center" 
        snapToInterval={width} 
        contentContainerStyle={{alignItems: 'center'}}>
        {movies.slice(0, 10).map(item => (
          <TouchableOpacity
            key={item.show.id}
            style={[styles.horizontalCard, {width}]} 
            onPress={() => navigation.navigate('Details', {movie: item.show})}>
            <Image
              source={{uri: item.show.image?.medium}}
              style={styles.horizontalImage}
            />
            <Text numberOfLines={1} style={styles.horizontalText}>
              {item.show.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.HeadomgContainer}>
        <Text style={styles.HeadingText}>All Movies</Text>
      </View>
      {movies.map(renderMovie)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: 'red'},
  
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
  
  horizontalCard: {
    height: 300, 
    backgroundColor: 'white',
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  horizontalImage: {
    width: '100%', 
    height: '100%', 
  },
  horizontalText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
  movieContainer: {
    marginBottom: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
    borderRadius: 5, 
  },
  thumbnail: {width: '100%', borderRadius: 5, backgroundColor: 'rgb(0,0,15)'},
  title: {
    padding:5,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    color:'white',
    marginVertical: 5,
    textAlign: 'left',
    width: '100%', 
  },
  summary: {
    fontSize: 14,
    color: 'white',
    textAlign: 'left', 
    width: '100%', 
    padding:5
  },
  HeadomgContainer: {
    width: '100%', 
    marginVertical:10,
    paddingHorizontal: 10, 
    marginBottom: 10, 
  },
  HeadingText: {
    fontSize: 26, 
    fontWeight: 'bold', 
    letterSpacing: 2,
    color: 'white', 
    textAlign: 'left', 
  },
  icon: {
    width: 20, 
    height: 20,
    marginRight: 10, 
  },
  searchBar: {
    flex: 1, 
    height: 40,
    fontSize: 16,
  },
});
