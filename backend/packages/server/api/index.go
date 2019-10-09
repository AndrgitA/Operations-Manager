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

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Content-Type", "application/json")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, *")
}

func verify(f func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		log.Println(r.Method, r.URL.Path)
		if r.Method == "OPTIONS" {
			f(w, r)
			return
		}
		_, err := db.GetUserByToken(r.Header.Get("Token"))
		if err != nil {
			setupResponse(&w, r)
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}
		f(w, r)
	}
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

	// router.Use(authMiddleWare)
	router.HandleFunc("/api/v1/processes", verify(processHandle))
	router.HandleFunc("/api/v1/processes/{pid}", verify(processPidHandle))
	router.HandleFunc("/api/v1/scripts", verify(scriptsHandle))
	router.HandleFunc("/api/v1/scripts/{id}", verify(scriptHandle))
	// homeHandle := http.HandlerFunc(home)
	// router.HandleFunc("/", authMiddleWare(homeHandle))
	return nil
}
