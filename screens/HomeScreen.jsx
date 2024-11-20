import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { fetchMoviesAndShows } from '../api/moviesApi'; // Mock API function
import { Ionicons } from '@expo/vector-icons'; // For icons

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAscending, setIsAscending] = useState(true); // For sorting order
  const [filterType, setFilterType] = useState(''); // For filtering type (e.g., Movie/Show)
  const [isGrid, setIsGrid] = useState(false); // For toggling grid layout
  const [refreshing, setRefreshing] = useState(false);

  const loadMovies = async () => {
    const data = await fetchMoviesAndShows();
    setMovies(data);
    setFilteredMovies(data); // Default filtered list
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredMovies].sort((a, b) => {
      if (isAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredMovies(sorted);
    setIsAscending(!isAscending); // Toggle sorting order
  };

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === '') {
      setFilteredMovies(movies); // Reset filter
    } else {
      const filtered = movies.filter((movie) => movie.type.toLowerCase() === type.toLowerCase());
      setFilteredMovies(filtered);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing spinner
    try {
      await loadMovies(); // Reload the data
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh movies.');
    } finally {
      setRefreshing(false); // Stop the refreshing spinner
    }
  };

  const handleHamburgerClick = () => {
    Alert.alert('Menu', 'Hamburger Menu clicked!', [{ text: 'OK' }]);
  };

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      style={isGrid ? styles.gridCard : styles.listCard}
      onPress={() =>
        navigation.navigate('MovieDetails', { movieId: item.id })
      }
    >
      <Image source={{ uri: item.poster_url }} style={styles.poster} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        {!isGrid && (
          <>
            <Text style={styles.description} numberOfLines={2}>
              {item.Description}
            </Text>
            <Text style={styles.type}>{item.type}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHamburgerClick}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cinemas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.searchContainer}>
        {/* Sort Button */}
        <TouchableOpacity onPress={handleSort}>
          <Text style={styles.actionText}>{isAscending ? 'Sort A-Z' : 'Sort Z-A'}</Text>
        </TouchableOpacity>
        {/* Filter Button */}
        <TouchableOpacity onPress={() => handleFilter(filterType === 'movie' ? '' : 'movie')}>
          <Text style={styles.actionText}>
            {filterType === 'movie' ? 'Clear Filter' : 'Filter Movies'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter(filterType === 'show' ? '' : 'show')}>
          <Text style={styles.actionText}>
            {filterType === 'show' ? 'Clear Filter' : 'Filter Shows'}
          </Text>
        </TouchableOpacity>
        {/* Grid Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={styles.actionText}>Grid</Text>
          <Switch value={isGrid} onValueChange={() => setIsGrid(!isGrid)} />
        </View>
      </View>

      {/* Movie List */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieCard}
        key={isGrid ? 'G' : 'L'} // Re-render FlatList when switching layouts
        numColumns={isGrid ? 2 : 1}
        contentContainerStyle={styles.list}
        refreshing={refreshing}  // Bind refreshing state
        onRefresh={onRefresh}  // Handle the refresh action
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    marginRight: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#007bff',
    marginHorizontal: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  list: {
    paddingHorizontal: 10,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    elevation: 1,
  },
  gridCard: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 1,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 4,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
  },
  type: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007bff',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#e9f7ff',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default HomeScreen;
