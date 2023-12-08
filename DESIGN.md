# Summary

This is an app made with Expo Go and React Native for iOS called "Unhampered". It is meant to use the LaundryView API (https://www.laundryview.com/selectProperty) to get data about laundry machines for a given property and display them in a useful way for people to check before going to do laundry. I intended this app to have more features, including saving the state of the app when closed and reopened to make usage more convenient and perhaps graphical interfaces, but coding the app itself proved to take more expertise than I planned and therefore while it isn't what I had initially proposed, I am very proud of its functionality.

This app uses packages React Navigation, Expo Icons, Axios, and was tested on my iPhone with the Expo Go app. I recommend testing my project with the same process, using "npx expo start --tunnel" on Harvard wifi generally and scanning the QR code.

# File Structure:

The file structure is as follows:
assets - the icons for the app, I have only updated the main one
src - the folder containing all the React components and almost all of the code I've written
App.js - the main js file which runs the app
app.json - the json file that exports the app and its icons properly (?) - premade by React
babel.config.js - a file for package control and backwards support
DESIGN.md - this file!
package-lock.json - a file that declares all the packages the app depends on
package.json - a file containing metadata and scripts for the app
README.md - the readme file on how to use the app

Within assets:
assets/
├── adaptive-icon.png - the unchanged default icon
├── favicon.png - the unchanged default icon
├── icon.png - icon from https://thenounproject.com/icon/laundry-basket-4792780/
└── splash.png - the unchanged default icon

Within src:
src/
├── components/
│ ├── DispRoom.js - RoomInfo child component that takes the parsed data from the API and returns the formatted info for display
│ ├── PropertySearch.js - the homescreen list component that handles querying the API for properties and sorts by user search
│ ├── RoomInfo.js - the info page component that handles querying the API for room info and parsing it into the washers and dryers
│ ├── RoomSearch.js - an old child component that showcases some of the work overwritten during the development process
│ └── SchoolSearch.js - the property page list that queries the API for laundry rooms of a given property and displays them
├── screens/
│ ├── ErrorScreen.js - unused screen that was meant to handle async-storage or React Navigation errors
│ ├── HomeScreen.js - homepage that displays the title and PropertySearch
│ ├── LoadingScreen.js - mostly unseen screen that displays if the homepage is not yet ready when the app starts
│ ├── PropertyScreen.js - property page that displays the property name and SchoolSearch
│ └── RoomScreen.js - info page that displays the room name and RoomInfo, which in turn calls DispRoom
├── styles/
│ └── styles.js - separate React stylesheet
└── storage.js - empty file that would contain functions for async-storage to be used to store the last visited page

App.js mostly handles the navigation of the app, using React Navigation to move between screens in the proper order.

I chose to leave in the unused files - RoomSearch.js, ErrorScreen.js, and storage.js to better showcase my vision for the project and some of the work that I had to replace when developing the app.

# App Flow:

The app flows as follows:

- App.js runs, setting up the navigation and the framework for async-storage, and sends the user to HomeScreen after a brief LoadingScreen
- the user types a search into the HomeScreen, which prompts PropertySearch to display properties that match the search
- the user selects a property which navigates to PropertyScreen with the corresponding property ID, and calls SchoolSearch to load rooms
- the user selects a laundry room which navigates to RoomScreen with the corresponding property and laundry room ID
- RoomScreen calls RoomInfo to load and DispRoom the information of the given laundry room

# Screen Stacking:

At any point, swiping back returns to the previous screen on the stack, so being at the RoomScreen has stack as follows:
HomeScreen \ PropertyScreen \ RoomScreen
So, swiping back once would be:
HomeScreen \ PropertyScreen
And doing so twice returns to the original page:
HomeScreen

# Packages:

The app uses Expo's vector icons to display the status of the machines in a more visual way, as well as using styling to change the background info. React Navigation is used to navigate between app pages, and axios is used to handle asynchronous API calls.

# Design Choices:

I initially set out with three goals: make the app (1) functional, (2) convenient, and (3) appealing. I believe I achieved the first and part of the second, which is about between the good and better goals I set for myself. Overall, I think that while the design of the app is not perfect, it handles pretty well. The main design issues are likely query speed, name consistency (which is partly due to LaundryView's poor API data organization), and navigation structure (especially React props, because I know I don't fully understand them).

1. The app is functional; I reverse engineered the LaundryView API and used React Navigation to make the app properly allow the user to find information about different rooms in different properties.
2. The app is slightly convenient because it is simplistic and displays information with consistent styling and clear indication. It has minimal but obvious functionality besides the swiping, which I did not have time to create another component to scaffold. If I could have implemented the async-storage functionality to remember the last visited page of the user or create, say, a recently visited tab, I would feel that I had accomplished this goal in its entirety.
3. LaundryView has its own graphical interface for the laundry machines, but it is not extremely helpful to use. In an ideal final version of this project, I would have hoped to use some sort of map interface to display property and room locations, as well as machine locations in rooms, not for any more efficiency for the user to navigate really but just to give users visual cues to identify when going through the app and giving more information about the locations of rooms and properties. This was a very high bar, but part of the initial vision I had for the project and would definitely make the app much more standalone from LaundryView, since it would likely have to tie in some sort of map API.

Overall, I am satisfied with my design system -- especially my file organization and problem breakdown -- and think that it is robust enough to easily facilitate updates to improve the app.
