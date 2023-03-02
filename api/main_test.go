package main

import (
	"bytes"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestCompleteAuth(t *testing.T) {
	// Create a new http request
	req, err := http.NewRequest("GET", "/callback", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new response recorder
	rr := httptest.NewRecorder()

	// Call the handler function
	handler := http.HandlerFunc(completeAuth)
	handler.ServeHTTP(rr, req)

	// Check the status code of the response
	if status := rr.Code; status != http.StatusSeeOther {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusSeeOther)
	}

	// Check the response body of the response
	expected := "Login Completed!"
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestSendRedirectURI(t *testing.T) {
	// Create a new request with empty body
	req, err := http.NewRequest("GET", "/link", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new response recorder
	rr := httptest.NewRecorder()

	// Call the handler function
	handler := http.HandlerFunc(sendRedirectURI)
	handler.ServeHTTP(rr, req)

	// Check the status code of the response
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check the content type of the response
	if ctype := rr.Header().Get("Content-Type"); ctype != "application/json" {
		t.Errorf("handler returned wrong content type: got %v want %v", ctype, "application/json")
	}

	// Check the response body of the response
	expected := `{"link":"auth-url"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestSendToken(t *testing.T) {
	// Create a new request with empty body
	req, err := http.NewRequest("GET", "/token", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new response recorder
	rr := httptest.NewRecorder()

	// Call the handler function
	handler := http.HandlerFunc(sendToken)
	handler.ServeHTTP(rr, req)

	// Check the status code of the response
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check the content type of the response
	if ctype := rr.Header().Get("Content-Type"); ctype != "application/json" {
		t.Errorf("handler returned wrong content type: got %v want %v", ctype, "application/json")
	}

	// Check the response body of the response
	expected := `{"token":{"access_token":"access-token","token_type":"Bearer","refresh_token":"refresh-token","expiry":"2023-03-02T08:00:00Z"}}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestHealthCheck(t *testing.T) {
	// Create a new request with empty body
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new response recorder
	rr := httptest.NewRecorder()

	// Call the handler function
	handler := http.HandlerFunc(healthCheck)
	handler.ServeHTTP(rr, req)

	// Check the status code of the response
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check the log message
	logOutput := new(bytes.Buffer)
	log.SetOutput(logOutput)
	logs := logOutput.String()
	if !strings.Contains(logs, "Got request for: /") {
		t.Errorf("handler didn't log expected message: got %v want %v", logs, "Got request for: /")
	}
}
