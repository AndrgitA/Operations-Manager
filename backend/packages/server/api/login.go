package api

import (
	"encoding/json"
	"net/http"

	dbm "../../db"
)

func loginHandle(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)

	switch r.Method {
	case "GET":
		user, err := db.GetUserByToken(r.Header.Get("Token"))
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}
		json.NewEncoder(w).Encode(user)
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	case "POST":
		var body *dbm.PostLoginHttp
		err := Unmarshel(r.Body, &body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		user, err := db.GetUser(body.Login, body.Password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		json.NewEncoder(w).Encode(user)
	default:
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
}
