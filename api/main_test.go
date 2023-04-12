package main

import (
	"encoding/json"
	//"fmt"
	"context"
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
