package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"golang.org/x/oauth2"
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

func TestSendTokenHandler(t *testing.T) {
	// create a request to the token endpoint
	req, err := http.NewRequest("GET", "/token", nil)
	assert.NoError(t, err)

	// create a response recorder to capture the response
	rr := httptest.NewRecorder()

	// call the handler
	handler := http.HandlerFunc(sendToken)
	handler.ServeHTTP(rr, req)

	// check the response status code
	assert.Equal(t, http.StatusOK, rr.Code)

	// check the response body
	var response map[string]*oauth2.Token
	err = json.Unmarshal(rr.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Contains(t, response, "token")
	//assert.NotNil(t, response["token"])
}
