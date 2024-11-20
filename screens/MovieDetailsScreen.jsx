// movie id's are not correct and the endpoint with :movieId is not working 
// so only this endpoint is working and return on 1 movie details 

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('To Watch'); // Default selection
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rapidmock.com/api/vikuman/v1/movies`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        Alert.alert('Error', 'Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleAddToList = async () => {
    setAdding(true);
    try {
      const response = await axios.post(
        `https://api.rapidmock.com/api/vikuman/v1/mylist/add`,
        { movieId, status: selectedStatus }
      );

      if (response.status === 200) {
        Alert.alert('Success', `${movieDetails.title} added to ${selectedStatus}!`);
      } else {
        throw new Error('Failed to add movie.');
      }
    } catch (error) {
      console.error('Error adding to list:', error);
      Alert.alert('Error', 'Failed to update your list. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Poster and Title */}
      <View style={styles.posterContainer}>
        <Image source={{ uri: movieDetails.poster_url }} style={styles.poster} />
        <View>
          <Text style={styles.title}>{movieDetails.title}</Text>
          <Text style={styles.type}>{movieDetails.type}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{movieDetails.description}</Text>

      {/* Segmented Control for Adding */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedStatus === 'To Watch' && styles.activeSegment,
          ]}
          onPress={() => setSelectedStatus('To Watch')}
        >
          <Text
            style={[
              styles.segmentText,
              selectedStatus === 'To Watch' && styles.activeSegmentText,
            ]}
          >
            To Watch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            selectedStatus === 'Watched' && styles.activeSegment,
          ]}
          onPress={() => setSelectedStatus('Watched')}
        >
          <Text
            style={[
              styles.segmentText,
              selectedStatus === 'Watched' && styles.activeSegmentText,
            ]}
          >
            Watched
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, adding && styles.disabledButton]}
        onPress={handleAddToList}
        disabled={adding}
      >
        <Text style={styles.addButtonText}>
          {adding ? 'Adding...' : `Add to ${selectedStatus}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6f9',
    padding: 20,
  },
  posterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  type: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeSegment: {
    backgroundColor: '#6200ee',
  },
  segmentText: {
    fontSize: 16,
    color: '#333',
  },
  activeSegmentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#bcbcbc',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetailsScreen;
