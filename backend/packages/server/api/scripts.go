package api

import (
	"encoding/json"
	"net/http"

	dbm "../../db"
	mux "github.com/gorilla/mux"
)

func scriptsHandle(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	switch r.Method {
	case "GET":
		scripts, err := db.GetScripts(r.Header.Get("Token"))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(scripts)
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	case "POST":
		var body *dbm.PostScriptHttp
		err := Unmarshel(r.Body, &body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = db.InsertScript(r.Header.Get("Token"), body.Text)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(map[string]bool{"success": true})
	default:
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
}

func scriptHandle(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	vars := mux.Vars(r)
	switch r.Method {
	// case "GET":
	// 	scripts, err := db.GetScripts(r.Header.Get("Token"))
	// 	if err != nil {
	// 		http.Error(w, err.Error(), http.StatusInternalServerError)
	// 		return
	// 	}
	// 	json.NewEncoder(w).Encode(scripts)
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	case "PUT":
		var body *dbm.PostScriptHttp
		err := Unmarshel(r.Body, &body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = db.UpdateScript(vars["id"], body.Text)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(map[string]bool{"success": true})
	default:
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
}
