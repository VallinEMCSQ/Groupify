package main

import (
	"encoding/json"
	//"fmt"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	//"golang.org/x/oauth2"
)

func TestHealthCheckHandler(t *testing.T) {
	// create a request to the health check endpoint
	req, err := http.NewRequest("GET", "/", nil)
	assert.NoError(t, err)

	// create a response recorder to capture the response
	rr := httptest.NewRecorder()

	// call the handler
	handler := http.HandlerFunc(healthCheck)
	handler.ServeHTTP(rr, req)

	// check the response status code
	assert.Equal(t, http.StatusOK, rr.Code)

	// check the response body
	expected := ""
	assert.Equal(t, expected, rr.Body.String())
}

func TestSendRedirectURIHandler(t *testing.T) {
	// create a request to the link endpoint
	req, err := http.NewRequest("GET", "/link", nil)
	assert.NoError(t, err)

	// create a response recorder to capture the response
	rr := httptest.NewRecorder()

	// call the handler
	handler := http.HandlerFunc(sendRedirectURI)
	handler.ServeHTTP(rr, req)

	// check the response status code
	assert.Equal(t, http.StatusOK, rr.Code)

	// check the response body
	var response map[string]string
	err = json.Unmarshal(rr.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Contains(t, response, "link")
	assert.NotEmpty(t, response["link"])
}

func TestCreateSessionCode(t *testing.T) {
	// Call the function to generate a session code
	sessionCode := createSessionCode()

	// Verify that the session code has a length of 6 characters
	if len(sessionCode) != 6 {
		t.Errorf("Expected session code length of 6, but got %d", len(sessionCode))
	}

	// Verify that the session code only contains characters from the "table"
	for _, c := range sessionCode {
		if !strings.Contains("1234567890", string(c)) {
			t.Errorf("Session code contains invalid character: %q", c)
		}
	}
}

func TestConnectDatabase(t *testing.T) {
	connectDatabase()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := databaseClient.Ping(ctx, nil)
	if err != nil {
		t.Errorf("Database connection failed: %v", err)
	}

	databaseClient.Disconnect(ctx)
}

func TestCreateSession(t *testing.T) {
	// Create a fake HTTP request and response
	req := httptest.NewRequest("POST", "/createSession", nil)
	w := httptest.NewRecorder()

	// Call the function being tested
	createSession(w, req)

	// Check that the response status code is 200 OK
	if w.Code != http.StatusOK {
		t.Errorf("createSession returned wrong status code: got %v, want %v", w.Code, http.StatusOK)
	}

	// Check that the response body contains the expected sessionCode
	expectedResponse := `{"sessionCode":`
	if !strings.Contains(w.Body.String(), expectedResponse) {
		t.Errorf("createSession returned unexpected response body: got %v, want body containing %v", w.Body.String(), expectedResponse)
	}

	// Check that the sessionCodes map was updated
	if len(sessionCodes) != 1 {
		t.Errorf("createSession did not add a new session code to the sessionCodes map")
	}

	// Check that the usersCollection and songsCollection were created in the database
	// (You would need to replace the empty strings with actual usernames and song names.)
	user := bson.M{"userName": ""}
	song := bson.M{"songName": ""}
	userResult := usersCollection.FindOne(ctx, user)
	if userResult.Err() != nil {
		t.Errorf("createSession did not create the users collection in the database: %v", userResult.Err())
	}
	songResult := songsCollection.FindOne(ctx, song)
	if songResult.Err() != nil {
		t.Errorf("createSession did not create the songs collection in the database: %v", songResult.Err())
	}
}
