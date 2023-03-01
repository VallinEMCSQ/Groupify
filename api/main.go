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
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
	
	"github.com/gorilla/mux"

	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
)

// redirectURI is the OAuth redirect URI for the application.
// You must register an application at Spotify's developer portal
// and enter this value.
const redirectURI = "http://localhost:4200/callback"

var (
	auth  = spotifyauth.New(spotifyauth.WithRedirectURL(redirectURI), spotifyauth.WithScopes(spotifyauth.ScopeUserReadPrivate))
	ch    = make(chan *spotify.Client)
	state = "abc123"
)

func run() {


}
func main() {
	

	url := auth.AuthURL(state)

	// create router
	router := mux.NewRouter()

	// handle functions
	router.HandleFunc("/callback", completeAuth)
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Got request for:", r.URL.String())
	})
	router.HandleFunc("/link", func(w http.ResponseWriter, r *http.Request) {
		// Create a map to hold the response data
		response := map[string]string{
			"link": url,
		}

		// Set the response Content-Type to application/json
		w.Header().Set("Content-Type", "application/json")

		// Encode the response data as JSON and write it to the response writer
		json.NewEncoder(w).Encode(response)
		log.Println("Handler function entered")
	}).Methods("GET")


	// Create a new cors middleware instance with desired options
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200"}, // Replace with your frontend server URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	// Wrap the router with the cors middleware
	handler := c.Handler(router)

	// start an HTTP server
	go func() {
		err := http.ListenAndServe(":8080", handler)
		if err != nil {
			log.Fatal("There's an error with the server", err)
		}
	}()
	
	fmt.Println("Please log in to Spotify by visiting the following page in your browser:", url)

	// wait for auth to complete
	client := <-ch

	// use the client to make calls that require authorization
	user, err := client.CurrentUser(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("You are logged in as:", user.ID)
}

func completeAuth(w http.ResponseWriter, r *http.Request) {
	tok, err := auth.Token(r.Context(), state, r)
	if err != nil {
		http.Error(w, "Couldn't get token", http.StatusForbidden)
		log.Fatal(err)
	}
	if st := r.FormValue("state"); st != state {
		http.NotFound(w, r)
		log.Fatalf("State mismatch: %s != %s\n", st, state)
	}

	// use the token to get an authenticated client
	client := spotify.New(auth.Client(r.Context(), tok))
	fmt.Fprintf(w, "Login Completed!")
	ch <- client
}
