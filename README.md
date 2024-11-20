Cinemas App
This project is a React Native application that provides information about movies and shows, including a pull-to-refresh feature, search functionality, sorting, filtering, and layout toggle (grid/list view).

Features
Search: Search movies and shows by title.
Sort: Sort the list alphabetically (A-Z or Z-A).
Filter: Filter content by type (Movies or Shows).
Toggle View: Switch between grid and list layouts.
Pull to Refresh: Refresh the data with a pull-down gesture.
Navigation: Navigate to detailed pages for movies and shows.
Hamburger Menu and Profile: Interactive header buttons.
Assumptions
Data Source:

Movies and shows data is fetched from a mock API function fetchMoviesAndShows located in the ../api/moviesApi file.
Each item in the dataset includes fields like:
id: Unique identifier for the movie/show.
title: Title of the movie/show.
type: Indicates whether it's a movie or show.
poster_url: URL for the poster image.
Description: Brief description of the movie/show.
Dependencies:

This project uses the react-native framework.
Icons are provided by @expo/vector-icons.
Navigation:

The app assumes React Navigation is properly configured.
Two navigation routes are required:
HomeScreen: This is the main screen.
MovieDetails: Displays detailed information about a movie or show.
UI Components:

Pull-to-refresh functionality uses FlatList’s native onRefresh and refreshing props.
Grid and list layouts dynamically change based on the isGrid state.
Setup Instructions
Prerequisites
Environment Setup:

Install Node.js (Recommended version: 18 or later).
Install Expo CLI for React Native development:
bash
Copy code
npm install -g expo-cli
Install dependencies for React Native.
Install Dependencies:

Run the following command in the project directory:
bash
Copy code
npm install
Mock API Setup:

Ensure the ../api/moviesApi.js file contains a mock function fetchMoviesAndShows that returns an array of movie and show objects.
React Navigation Setup:

Install @react-navigation/native and related dependencies:
bash
Copy code
npm install @react-navigation/native react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
Platform-Specific Setup (Optional):

For iOS: Install CocoaPods dependencies.
bash
Copy code
npx pod-install
Running the Application
Start the Development Server:

bash
Copy code
npm start
Run on Emulator or Device:

For Android:
bash
Copy code
npm run android
For iOS:
bash
Copy code
npm run ios
Access the App:

Scan the QR code in the Expo Go app or run it on your configured emulator.
Troubleshooting
Pull-to-Refresh Not Working:

Ensure refreshing state is correctly updated in the onRefresh function.
Navigation Errors:

Verify that the navigation setup includes HomeScreen and MovieDetails routes.
Data Fetching Issues:

Check the fetchMoviesAndShows mock API function and ensure it returns valid JSON data.
Future Enhancements
Integrate a real backend API for fetching movies and shows.
Add pagination for better performance with large datasets.
Include additional filters, such as by genre or release year.
