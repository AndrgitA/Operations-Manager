package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"

	dbm "../../db"
	mux "github.com/gorilla/mux"
)

var db *dbm.DB = nil

func Marshal(v interface{}) (io.Reader, error) {
	b, err := json.MarshalIndent(v, " ", "\t")
	if err != nil {
		return nil, err
	}
	return bytes.NewReader(b), nil
}

func Unmarshel(r io.Reader, v interface{}) error {
	return json.NewDecoder(r).Decode(v)
}

// authMiddleWare check authorization user
func authMiddleWare(next http.Handler) http.HandlerFunc {
	log.Println("Executing middleWare")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			w.WriteHeader(404)
			w.Write([]byte("not found"))
			return
		}
		next.ServeHTTP(w, r)
	})
}

func home(w http.ResponseWriter, r *http.Request) {
	log.Println("Executing homeHandle")
	w.Write([]byte("OK ANDRGIT, THIS IS HOME RESPONSE"))
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Content-Type", "application/json")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, *")
}

func InitRouter(router *mux.Router, DataBase *dbm.DB) error {
	if router == nil {
		return errors.New("Router is nil")
	}

	if DataBase == nil {
		return errors.New("DataBase is nil")
	}

	db = DataBase
	router.HandleFunc("/api/v1/login", loginHandle)

	// homeHandle := http.HandlerFunc(home)
	// router.HandleFunc("/", authMiddleWare(homeHandle))
	return nil
}
