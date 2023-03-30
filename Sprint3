Frontend
Page routing was set up so that the user could navigate between the login page, start page, and host page.
A get function was written to send parameters to the back end and receive an authorization token in response, once the login authorization was complete.
The user is successfully redirected back to the front end server after the login is complete, where the user has the option to join an existing session or host a new session
A get function was written to create a new session that is stored in the database, and receives a unique, 6 digit code in response that will be displayed for the users to join unique sessions.
Animations and transitions were added to be more seamless. The background and text styles were also improved upon to create a more attractive viewing experience
Cypress Tests:
End to end
Navigate to the host page when the host button is clicked
Navigate to the spotify login page when the login button is clicked
Component
Create the host component
Create the join-screen component and test that it contains the “Login to Spotify to listen” button
Create the player component and test that it contains the Play, Next, and Previous buttons
Create the start component
Unit Tests:



Backend
A database using mongoDB was set up in order to hold info regarding the user that is in a session and the songs that they want to queue.
A new database is created for every session that is hosted with no repeat session codes being created.
The backend is connected to the database using a connection string specific to a cluster we are using along with the current IP address of the computer accessing the cluster.
A create session function is called whenever a GET request is sent to the local golang server port with the extension “/create-session” which will be called when the user clicks the host button on the frontend.
As of right now, the host button does not work but the functionality of the create session function can be seen by using a mockup frontend application like Postman.
The create session function adds 1 document with empty values in order to see the database but they will be replaced with actual user and song data later.
After the user is redirected to spotify accounts to log in, it is then redirected to local host 4200, the front end server. We ran into an obstacle trying to complete the authorization since we could only generate a token in the backend. Therefore, the completeAuth function was created to finish the authorization flow.
The completeAuth function is a get handler that receives a code and a state from the front end after the user logs in as parameters. Then it uses those values to generate a token by calling TokenFunc. It then encodes the token as a json and sends it back to the frontend.
Unit Tests:
TestConnectDatabase
TestCreateSessionCode

Documentation:
TokenFunc : Generates a token using the code and state from user login authorization.
CompleteAuth: receives code and state parameters from front end to call TokenFunc and generate a code. It then encodes the token as a json and sends it back to the frontend.
Forever: A never-ending loop to prevent the termination of main. This keeps the server running and listening indefinitely.
New: Creates a new authenticator
WithRedirectURl: creates the link to the spotify login page with a parameter to redirect to a url
createSessionCode: Creates a 6 digit session code that will be returned to the frontend.
CreateSession: Calls createSessionCode to create the session code while making sure duplicates are not made. Creates a database with the name being the session code so that different sessions can be running at the same time.
ConnectDatabase: Simply connects the main.go file to the database and makes it usable while creating a mongodb client.
DisconnectDatabase: Make sure to disconnect the database after so that there are no errors at the termination of the program,

