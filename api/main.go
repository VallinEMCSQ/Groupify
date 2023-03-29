package main

import (
<<<<<<< Updated upstream
	//"context"
=======
	"context"
	"crypto/rand"
>>>>>>> Stashed changes
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
<<<<<<< Updated upstream

	"github.com/gorilla/mux"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
=======
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
>>>>>>> Stashed changes
)

const (
	redirectURI = "http://localhost:8080/callback"
	state       = "abc123" // a random state value for security
)

var (
	auth = spotify.NewAuthenticator(
		redirectURI,
		spotify.ScopeUserReadPrivate,
		spotify.ScopeUserReadEmail,
	)
	ch = make(chan *spotify.Client)
<<<<<<< Updated upstream
)

func main() {

	router := mux.NewRouter()
=======
	tok *oauth2.Token
	//userClient spotify.Client
	databaseClient *mongo.Client
	err error
	songsCollection *mongo.Collection
	usersCollection *mongo.Collection
	ctx context.Context
	table = [...]byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}
	sessionCodes = make(map[string]string)
)

type Person struct {
	Username string `json:"Username"`
	ID       string `json:"age"`
}
type Song struct {
	Name     string `json:"Name"`
	Duration int    `json:"Duration"`
	//Artists []SimpleArtist      `json:"Artists"`
}

// type test_struct struct {
//     userName string `json:"userName"`
// 	songName string `json:"songName`
// }

func connectDatabase() {

	// creates a client object to connect to the databse using a username, password, and url specific to the cluster
	databaseClient,err = mongo.NewClient(options.Client().ApplyURI("mongodb+srv://clarksamuel:27G4Jkg6bWjhswT7@cluster0.xsc8ntw.mongodb.net/?retryWrites=true&w=majority"))
	// Error checking
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = databaseClient.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

}

func disconnectDatabase() {
	defer databaseClient.Disconnect(ctx)
	err = databaseClient.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
}

func run() {
	// create router
	router := mux.NewRouter()

	// handle functions
	router.HandleFunc("/callback", completeAuth)
	router.HandleFunc("/health-check", healthCheck)
	router.HandleFunc("/link", sendRedirectURI).Methods("GET")
	router.HandleFunc("/token", sendToken).Methods("GET")
	router.HandleFunc("/create-session", createSession).Methods("GET")
	router.HandleFunc("/addsong", addsong).Methods("POST")
	//router.HandleFunc("/test", test).Methods("POST")
	router.HandleFunc("/getsong", getsong).Methods("GET")
	router.HandleFunc("/deletesong", deletesong).Methods("DELETE")

	// Create a new cors middleware instance with desired options
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200"}, // Replace with your frontend server URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	// Wrap the router with the cors middleware
	handler := c.Handler(router)

	// start a new server
	go func() {
		err := http.ListenAndServe(":8080", handler)
		if err != nil {
			log.Fatal(err)
		}
	}()
}

func main() {

	connectDatabase()
>>>>>>> Stashed changes


	router.HandleFunc("/callback", completeAuth)
	router.HandleFunc("/", startAuth)

<<<<<<< Updated upstream
	go http.ListenAndServe(":8080", router)

	fmt.Println("Please visit http://localhost:8080 to authenticate this application.")
	client := <-ch

	user, err := client.CurrentUser()
=======
	// wait for auth to complete
	userClient := <-ch

	// use the client to make calls that require authorization
	user, err := userClient.CurrentUser()
>>>>>>> Stashed changes
	if err != nil {
		fmt.Printf("Error getting current user: %s\n", err.Error())
		return
	}
<<<<<<< Updated upstream

	fmt.Printf("You are logged in as: %s\n", user.ID)
}

func startAuth(w http.ResponseWriter, r *http.Request) {
	url := auth.AuthURL(state)
	http.Redirect(w, r, url, http.StatusFound)
}

func completeAuth(w http.ResponseWriter, r *http.Request) {
=======
	fmt.Println("You are logged in as:", user.DisplayName)

	disconnectDatabase()
	
}

func createSessionCode() string {
	b := make([]byte, 6)
    n, err := io.ReadAtLeast(rand.Reader, b, 6)
    if n != 6 {
        panic(err)
    }
    for i := 0; i < len(b); i++ {
        b[i] = table[int(b[i])%len(table)]
    }

	return string(b)
}


func createSession(writer http.ResponseWriter, r *http.Request) {

	var repeat bool = false
	var cont bool = true
	var temp string

	for cont {
		repeat = false
		temp = createSessionCode()

		for key := range sessionCodes {
			if key == temp {
				repeat = true
			}
		}

		if (repeat) {
			cont = true
		} else {
			break
		}
	}

	sessionCodes[temp] = "0"

	usersCollection = databaseClient.Database(temp).Collection("users")
	songsCollection = databaseClient.Database(temp).Collection("songs")

	users := bson.D{{Key: "userName", Value: ""}}
	songs := bson.D{{Key: "songName", Value: ""}}

	result, err := usersCollection.InsertOne(ctx, users)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result.InsertedID)

	result, err = songsCollection.InsertOne(ctx, songs)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result.InsertedID)

	//fmt.Fprintf(writer, temp)

	
	// Create a map to hold the response data
	response := map[string]string{
		"sessionCode": temp,
	}
	// Set the response Content-Type to application/json
	writer.Header().Set("Content-Type", "application/json")
	// Encode the response data as JSON and write it to the response writer
	err = json.NewEncoder(writer).Encode(response)
	if err != nil {
		log.Fatalln("There was an error encoding the token")
	}

}

func completeAuth(w http.ResponseWriter, r *http.Request) {

>>>>>>> Stashed changes
	tok, err := auth.Token(state, r)
	if err != nil {
		http.Error(w, "Couldn't get token", http.StatusForbidden)
		return
	}

<<<<<<< Updated upstream
=======
	// use the token to get an authenticated client
	client := auth.NewClient(tok)
	fmt.Fprintf(w, "Login Completed!")
	ch <- &client
	//http.Redirect(w, r, "http://localhost:4200", http.StatusSeeOther)
}

func healthCheck(writer http.ResponseWriter, request *http.Request) {
	log.Println("Got request for:", request.URL.String())
}

func sendRedirectURI(writer http.ResponseWriter, request *http.Request) {
	// Create a map to hold the response data
	response := map[string]string{
		"link": auth.AuthURL(state),
	}
	// Set the response Content-Type to application/json
	writer.Header().Set("Content-Type", "application/json")
	// Encode the response data as JSON and write it to the response writer
	err := json.NewEncoder(writer).Encode(response)
	if err != nil {
		log.Fatalln("There was an error encoding the URI link")
	}
}

func sendToken(writer http.ResponseWriter, request *http.Request) {
	// Create a map to hold the response data
>>>>>>> Stashed changes
	response := map[string]*oauth2.Token{
		"token": tok,
	}

	w.Header().Set("Content-type", "application/json")
	err1 := json.NewEncoder(w).Encode(response)
	if err1 != nil {
		log.Fatalln("There was an error encoding the token")
	}

	// create a client using the specified token
	//client := auth.NewClient(tok)
	fmt.Fprintf(w, "Login complete!")
	//ch <- &client
}
<<<<<<< Updated upstream
=======

func addsong(writer http.ResponseWriter, request *http.Request) {




}

func getsong(writer http.ResponseWriter, request *http.Request) {

}

func deletesong(writer http.ResponseWriter, request *http.Request) {

}
>>>>>>> Stashed changes
