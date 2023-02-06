package main

import (
	"context"
	"log"

	"github.com/zmb3/spotify"
	"golang.org/x/oauth2/clientcredentials"
)

func main() {
	authConfig := &clientcredentials.Config{
		ClientID:     "3a98bdcb00eb42408ed731cea7214c1c",
		ClientSecret: "6fe390a7c516430caec1dea10f57d386",
		TokenURL:     spotify.TokenURL,
	}

	accessToken, err := authConfig.Token(context.Background())
	if err != nil {
		log.Fatalf("error retrieve access token: %v", err)
	}

	client := spotify.Authenticator{}.NewClient(accessToken)

	playlistID := spotify.ID("37i9dQZF1DXcBWIGoYBM5M")
	playlist, err := client.GetPlaylist(playlistID)
	if err != nil {
		log.Fatalf("error retrieve playlist data: %v", err)
	}

	log.Println("playlist id:", playlist.ID)
	log.Println("playlist name:", playlist.Name)
	log.Println("playlist description:", playlist.Description)
}
