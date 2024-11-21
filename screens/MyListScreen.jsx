import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MyListScreen = () => {
  const [myList, setMyList] = useState({ "To Watch": [], "Watched": [] });
  const [activeTab, setActiveTab] = useState('To Watch');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);  // Track refreshing state
  const navigation = useNavigation();

  // Fetch movies for the list
  const fetchMyList = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.rapidmock.com/api/vikuman/v1/mylist');
      setMyList(response.data);
    } catch (error) {
      console.error('Error fetching My List:', error);
      Alert.alert('Error', 'Failed to fetch the list. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refresh spinner after data is loaded
    }
  };

  useEffect(() => {
    fetchMyList();
  }, []);

  // Get the movies for the currently active tab
  const activeList = myList[activeTab] || [];

  const handleHamburgerClick = () => {
    Alert.alert('Menu', 'Hamburger Menu clicked!', [{ text: 'OK' }]);
  };

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.movieId })}
      style={styles.card}
    >
      <Image source={{ uri: item.poster_url }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true); // Start the refreshing spinner
    fetchMyList(); // Reload the data
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHamburgerClick}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'To Watch' && styles.activeTab]}
          onPress={() => setActiveTab('To Watch')}
        >
          <Text style={[styles.tabText, activeTab === 'To Watch' && styles.activeTabText]}>
            To Watch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Watched' && styles.activeTab]}
          onPress={() => setActiveTab('Watched')}
        >
          <Text style={[styles.tabText, activeTab === 'Watched' && styles.activeTabText]}>
            Watched
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Content */}
      <View style={styles.content}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Movies</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : activeList.length === 0 ? (
          <Text style={styles.emptyMessage}>No items found in "{activeTab}".</Text>
        ) : (
          <FlatList
            data={activeList}
            keyExtractor={(item) => item.movieId.toString()}
            numColumns={1}  // Always display in a single column layout
            horizontal={true}  // Horizontal scroll
            showsHorizontalScrollIndicator={false}
            renderItem={renderMovieCard}
            refreshing={refreshing}  // Bind refreshing state
            onRefresh={onRefresh}  // Handle the refresh action
          />
        )}

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>TV Shows</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : activeList.length === 0 ? (
          <Text style={styles.emptyMessage}>No items found in "{activeTab}".</Text>
        ) : (
          <FlatList
            data={activeList}
            keyExtractor={(item) => item.movieId.toString()}
            numColumns={1}  // Always display in a single column layout
            horizontal={true}  // Horizontal scroll
            showsHorizontalScrollIndicator={false}
            renderItem={renderMovieCard}
            // refreshing={refreshing}  // Bind refreshing state
            // onRefresh={onRefresh}  // Handle the refresh action
          />
        )}
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#6c757d',
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    marginRight: 10,
    width: 140,
  },
  image: {
    width: 140,
    height: 210,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#6c757d',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default MyListScreen;
