package api

import (
	"encoding/json"
	"net/http"

	dbm "../../db"
	proc "../../process"
)

func scriptsHandle(w http.ResponseWriter, r *http.Request, userID int) {
	SetupResponse(&w, r)
	if userID == -1 && r.Method != "OPTIONS" {
		http.Error(w, "Error server", http.StatusInternalServerError)
		return
	}
	switch r.Method {
	case "GET":
		scripts, err := db.GetScripts(userID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(scripts)
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	// case "POST":
	// 	var body *dbm.PostScriptHttp
	// 	err := Unmarshel(r.Body, &body)
	// 	if err != nil {
	// 		http.Error(w, err.Error(), http.StatusBadRequest)
	// 		return
	// 	}
	// 	err = db.InsertScript(r.Header.Get("Token"), body.Text)
	// 	if err != nil {
	// 		http.Error(w, err.Error(), http.StatusInternalServerError)
	// 		return
	// 	}
	// 	json.NewEncoder(w).Encode(map[string]bool{"success": true})
	case "PUT":
		var body []*dbm.PostScriptHttp
		err := Unmarshel(r.Body, &body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		for i := range body {
			switch body[i].Status {
			case dbm.STATUS_SCRIPT_NEW:
				err = db.InsertScript(userID, body[i].Position, body[i].Text)
				if err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
					return
				}
			case dbm.STATUS_SCRIPT_UPDATE:
				err = db.UpdateScript(body[i].ID, body[i].Position, body[i].Text)
				if err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
					return
				}
			case dbm.STATUS_SCRIPT_DELETE:
				err = db.DeleteScript(body[i].ID)
				if err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
					return
				}
			case dbm.STATUS_SCRIPT_START:
				_, err := proc.StartScripts(body[i].Text)

				if err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
					return
				}
			}
		}
		json.NewEncoder(w).Encode(map[string]bool{"success": true})
	default:
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
}

// func scriptHandle(w http.ResponseWriter, r *http.Request) {
// 	SetupResponse(&w, r)
// 	vars := mux.Vars(r)
// 	switch r.Method {
// 	// case "GET":
// 	// 	scripts, err := db.GetScripts(r.Header.Get("Token"))
// 	// 	if err != nil {
// 	// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 	// 		return
// 	// 	}
// 	// 	json.NewEncoder(w).Encode(scripts)
// 	case "OPTIONS":
// 		w.WriteHeader(http.StatusOK)
// 	case "PUT":
// 		var body *dbm.PostScriptHttp
// 		err := Unmarshel(r.Body, &body)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusBadRequest)
// 			return
// 		}
// 		err = db.UpdateScript(vars["id"], body.Text)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 		json.NewEncoder(w).Encode(map[string]bool{"success": true})
// 	default:
// 		http.Error(w, "Bad request", http.StatusBadRequest)
// 		return
// 	}
// }
