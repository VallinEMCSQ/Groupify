// This example demonstrates how to authenticate with Spotify using the authorization code flow.
// In order to run this example yourself, you'll need to:
//
//  1. Register an application at: https://developer.spotify.com/my-applications/
//     - Use "http://localhost:8080/callback" as the redirect URI
//  2. Set the SPOTIFY_ID environment variable to the client ID you got in step 1.
//  3. Set the SPOTIFY_SECRET environment variable to the client secret from step 1.
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/zmb3/spotify/v2"

	//"github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2"
	/*"go.mongodb.org/mongo-driver/mongo"
	  "go.mongodb.org/mongo-driver/mongo/options"
	  "go.mongodb.org/mongo-driver/mongo/readpref"*/)

// redirectURI is the OAuth redirect URI for the application.
// You must register an application at Spotify's developer portal
// and enter this value.
const redirectURI = "http://localhost:4200/start"

type Authenticator struct {
	config *oauth2.Config
}

type AuthenticatorOption func(a *Authenticator)

// WithClientID allows a client ID to be specified. Without this the value of the SPOTIFY_ID environment
// variable will be used.
func WithClientID(id string) AuthenticatorOption {
	return func(a *Authenticator) {
		a.config.ClientID = id
	}
}

func WithClientSecret(secret string) AuthenticatorOption {
	return func(a *Authenticator) {
		a.config.ClientSecret = secret
	}
}

func WithRedirectURL(url string) AuthenticatorOption {
	return func(a *Authenticator) {
		a.config.RedirectURL = url
	}
}

func New(opts ...AuthenticatorOption) *Authenticator {
	cfg := &oauth2.Config{
		ClientID:     os.Getenv("SPOTIFY_ID"),
		ClientSecret: os.Getenv("SPOTIFY_SECRET"),
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://accounts.spotify.com/authorize",
			TokenURL: "https://accounts.spotify.com/api/token",
		},
	}

	a := &Authenticator{
		config: cfg,
	}

	for _, opt := range opts {
		opt(a)
	}

	return a
}

func (a Authenticator) Exchange(ctx context.Context, code string, opts ...oauth2.AuthCodeOption) (*oauth2.Token, error) {
	return a.config.Exchange(ctx, code, opts...)
}

func (a Authenticator) AuthURL(state string, opts ...oauth2.AuthCodeOption) string {
	return a.config.AuthCodeURL(state, opts...)
}

func (a Authenticator) Client(ctx context.Context, token *oauth2.Token) *http.Client {
	return a.config.Client(ctx, token)
}

var (
	auth  = New(WithRedirectURL(redirectURI))
	ch    = make(chan *spotify.Client)
	state = "abc123"
	tok   *oauth2.Token
)

type Person struct {
	Username string `json:"username,omitempty" bson:"username, omitempty"`
	ID       string `json:"age,omitempty" bson:"age,omitempty"`
}
type Song struct {
	Name     string `json:"name,omitempty" bson:"name,omitempty"`
	Duration int    `json:"duration,omitempty" bson:"duration,omitempty"`
	//Artists []SimpleArtist      `json:"Artists"`
}
type authInfo struct {
	Code string `json:"code"`
}

func run() {
	// create router
	router := mux.NewRouter()

	// handle functions
	router.HandleFunc("/callback", completeAuth).Methods("GET")
	router.HandleFunc("/", healthCheck)
	router.HandleFunc("/link", sendRedirectURI).Methods("GET")
	router.HandleFunc("/addsong", addsong).Methods("POST")
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

	run()

	url := auth.AuthURL(state)
	fmt.Println("Please log in to Spotify by visiting the following page in your browser:", url)

	// wait for auth to complete
	client := <-ch

	// use the client to make calls that require authorization
	user, err := client.CurrentUser(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("You are logged in as:", user.DisplayName)
}

func (a Authenticator) TokenFunc(ctx context.Context, actualState string, code string, r *http.Request, opts ...oauth2.AuthCodeOption) (*oauth2.Token, error) {
	/*values := r.URL.Query()
	if e := values.Get("error"); e != "" {
		return nil, errors.New("spotify: auth failed - " + e)
	}*/
	//code := values.Get("code")
	if code == "" {
		return nil, errors.New("spotify: didn't get access code")
	}
	//actualState := values.Get("state")
	if state != actualState {
		return nil, errors.New("spotify: redirect state parameter doesn't match")
	}
	return a.config.Exchange(ctx, code, opts...)
}

func completeAuth(w http.ResponseWriter, r *http.Request) {
	//read in parameters from front end
	codeNum := r.URL.Query().Get("code")
	stateNum := r.URL.Query().Get("state")
	// get token
	tok, err := auth.TokenFunc(r.Context(), stateNum, codeNum, r)
	if err != nil {
		http.Error(w, "Couldn't get token", http.StatusForbidden)
		log.Fatal(err)

	}
	if st := r.FormValue("state"); st != state {
		http.NotFound(w, r)
		log.Fatalf("State mismatch: %s != %s\n", st, state)
	}

	// Create a map to hold the response data
	response := map[string]*oauth2.Token{
		"token": tok,
	}
	// Set the response Content-Type to application/json
	w.Header().Set("Content-Type", "application/json")
	// Encode the response data as JSON and write it to the response writer
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Fatalln("There was an error encoding the token")
	}

	// use the token to get an authenticated client
	client := spotify.New(auth.Client(r.Context(), tok))
	fmt.Fprintf(w, "Login Completed!")
	ch <- client

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

func addsong(writer http.ResponseWriter, request *http.Request) {
	// read data from frontend into an object
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	var song Song
	err := json.NewDecoder(request.Body).Decode(&song)
	if err != nil {
		log.Fatalln("There was an error decoding the request body into the struct")
	}
	// DO: store object into the database
	// encode object back to frontend
	err = json.NewEncoder(writer).Encode(&song)
	if err != nil {
		log.Fatalln("There was an error encoding the initialized struct")
	}

}

func getsong(writer http.ResponseWriter, request *http.Request) {

}

func deletesong(writer http.ResponseWriter, request *http.Request) {

}
