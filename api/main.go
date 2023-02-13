package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2/clientcredentials"
)

type Response struct {
	Songs []Song `json:"songs"`
}

type Song struct {
	Id        spotify.ID    `json:"id"`
	SongName  string 		`json:"songName"`
}

func main() {
	log.Println("starting API server")
	//create a new router
	router := mux.NewRouter()
	log.Println("creating routes")
	//specify endpoints
	router.HandleFunc("/health-check", HealthCheck).Methods("GET")
	router.HandleFunc("/songs", Songs).Methods("GET")
	http.Handle("/", router)

	//start and listen to requests
	http.ListenAndServe(":8000", router)

}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	log.Println("entering health check end point")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "API is up and running")
}

func Songs(w http.ResponseWriter, r *http.Request) {
	log.Println("entering songs end point")
	var response Response
	songs := prepareResponse()

	response.Songs = songs

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		return
	}

	w.Write(jsonResponse)
}

func prepareResponse() []Song {
	var songs []Song

	var song Song

	authConfig := &clientcredentials.Config{
		ClientID:     "<CLIENT_ID>",
		ClientSecret: "<CLIENT_SECRET>",
		TokenURL:     spotify.TokenURL,
	}

	accessToken, err := authConfig.Token(context.Background())
	if err != nil {
		log.Fatalf("error retrieve access token: %v", err)
	}

	client := spotify.Authenticator{}.NewClient(accessToken)


    //https://open.spotify.com/track/3AVyKOmMgvRjsC576xWw78?si=5ba44b3dd44d43a9
	trackID := spotify.ID("3AVyKOmMgvRjsC576xWw78?si=5ba44b3dd44d43a9")
	track, err := client.GetTrack(trackID)
	if err != nil {
		log.Fatalf("error retrieve track data: %v", err)
	}

	song.Id = track.ID
	song.SongName = track.Name
	songs = append(songs, song)

	return songs
}
