package main

import (
	//"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
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
)

func main() {

	router := mux.NewRouter()


	router.HandleFunc("/callback", completeAuth)
	router.HandleFunc("/", startAuth)

	go http.ListenAndServe(":8080", router)

	fmt.Println("Please visit http://localhost:8080 to authenticate this application.")
	client := <-ch

	user, err := client.CurrentUser()
	if err != nil {
		fmt.Printf("Error getting current user: %s\n", err.Error())
		return
	}

	fmt.Printf("You are logged in as: %s\n", user.ID)
}

func startAuth(w http.ResponseWriter, r *http.Request) {
	url := auth.AuthURL(state)
	http.Redirect(w, r, url, http.StatusFound)
}

func completeAuth(w http.ResponseWriter, r *http.Request) {
	tok, err := auth.Token(state, r)
	if err != nil {
		http.Error(w, "Couldn't get token", http.StatusForbidden)
		return
	}

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
