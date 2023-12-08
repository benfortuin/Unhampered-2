Unhampered - an app built (primarily) for iOS with Expo Go and React Native by Ben Fortuin for his Fall 2023 CS50 final project!

https://youtu.be/7WlE3LSwbdY

To run the app, I recommend installing node.js on your computer and using the Expo Go app (found in your device's app store) to run the program, although I'm sure Expo also has its own tools to export the app into a native package (but I am not familiar with this, because this is how I tested). With this method, run "npx expo start --tunnel" in your terminal and scan the QR code with the device with Expo Go, or use an emulator (also unfamiliar). Though I cannot help further, I hope Expo's own documentation helps for any of these other methods: https://expo.dev/

The app has 3 screens: the homepage, the property's room listing, and the room info page.

On the homepage, you can input a search for a property monitored by LaundryView's API. The same options are on its website when you search: https://www.laundryview.com/selectProperty . The page will shift to accommodate your search results and should allow you to select any property you wish. For Harvard specific rooms, typing "underg" will bring Harvard Undergraduate Housing up the fastest and give you the most relevant data for your house!

Once you've found the property you want, tap on it to bring up the property listing page. On this page, a list of laundry rooms in that property should be displayed and the same functionality is used -- tap the corresponding room to bring up the info page for that room! If you want to go back and search for a different property, simply swipe from left to right and the page should slide away and bring you back to the homepage.

Lastly, once you've found the laundry room you want, tap on it to bring up its info page. This page has the name of the room, a column for the washing machine statuses, and a column for the dryer statuses. Information about the state of the room should load shortly apon opening the page, and refreshes each time the page is loaded (again, swipe left to right to go back to the property page and again to return all the way to the homepage).  This page has no interactability other than if the columns need to be scrolled, but dynamically displays the status of the machines in a way that makes it easy to see at a glance! 

Though my app is simple, it is mostly hand coded and a lot of its functionality with LaundryView's API had to be reverse-engineered, not copied. Though in my project proposal I had linked the github of a API created by someone else for LaundryView, I could not really figure out how to incorporate it into my project and thus had to do it by scratch. A lot of my time was spent trying to understand the URL get parameters for the API and designing the app to display the information for different types of rooms properly, such as stacked washers and dryers or getting the proper id for a given room. A lot of the work in this project is hidden in its simplicity!

Thank you for reading, and I hope you can appreciate my work.
