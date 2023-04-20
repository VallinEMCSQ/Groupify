Backend Functionality: In sprint 4, we worked on finishing up he backend connections to the ap and sending song lists to the frontend. We take both POST and GET requests in order to search for a certain song and populate a list for the frontend. We added a addqueue song in order to queue a song to the WEB SDK when the user clicks on the ADD button which will send a POST request with the song name that the backend receives and queues the song. We also added three functions that help connect the songs to the database more. Get, add, and deletesong were all added so that there was more functionality between the database and the backend and we are able to keep track of more things at once in order to maximize the use of our database.
Backend API Documentation:
- search
 
  Receives a string parameter from the frontend and passes that string into a spotify api function to search for a song that matches that string. It returns a page of tracks to the frontend with information about each track’s name, artist, uri, etc.

- addsong

  Post handle function that decodes the request body from the frontend into a song object. It then puts that song onto the database and encodes it back to the front end.

- getsong

  Get handle function that receives a string parameter from the frontend that identifies the name of the song to be found. It uses the FindOne function from mongoDB to search the database for a track that matches that string. It then returns that song to the front end by encoding it as a json.
  
- deletesong

  Handle function that receives a string parameter from the frontend that identifies the name of the song to be found. It uses the DeleteOne function from mongoDB to search the database for a track that matches that string then deletes from the database. 

- addqueue

  Post handle function that receives the ID of a track from the front end to queue that track into the web playback SDK.

Backend Unit Tests
- TestSearch
- TestGetSong

Front-end Functionality
- Users are sent to the player page where they are given the ability to access songs in their spotify Queue with play, next, and previous buttons.
- Sessions are given a unique six digit session pin generated using backend’s create session function.
- Unique, random six-digit session PINs are displayed so that users can join using the specific PIN
- Twenty songs or artist results searched using the entered string are displayed to the user as a list, to be selected and potentially added to the queue
- Current playing songs are displayed to the user on a mat-card providing the song title, artist name, and album cover (Received from the backend)
Front End Unit Tests
Front End Cypress Tests

