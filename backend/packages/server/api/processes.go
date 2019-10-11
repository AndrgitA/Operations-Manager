package api

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"syscall"

	dbm "../../db"
	proc "../../process"
	mux "github.com/gorilla/mux"
)

func processHandle(w http.ResponseWriter, r *http.Request, userID int) {
	SetupResponse(&w, r)
	switch r.Method {
	case "GET":
		processes, err := proc.GetRunningProcesses()
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		var response []*dbm.ProcessHttp
		for i, _ := range processes {
			response = append(response, processes[i].ConvertToProcessHTTP())
		}
		json.NewEncoder(w).Encode(response)
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	case "POST":
		var body *dbm.PostProcessesHttp
		err := Unmarshel(r.Body, &body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = nil
		_, err = proc.StartProcess(nil, body.CMD, body.Attributes)
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

func processPidHandle(w http.ResponseWriter, r *http.Request, userID int) {
	SetupResponse(&w, r)
	vars := mux.Vars(r)
	if len(vars["pid"]) == 0 {
		http.Error(w, "Bad pid", http.StatusBadRequest)
		return
	}

	pid, err := strconv.Atoi(vars["pid"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	switch r.Method {
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	case "POST":
		process, err := proc.GetProcessStatus(pid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		var body *dbm.PostProcessHttp
		err = Unmarshel(r.Body, &body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = nil
		switch body.Signal {
		case "EXIT":
			err = process.Signal(syscall.SIGQUIT)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		case "INTERRUPT":
			err = process.Signal(os.Interrupt)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		case "KILL":
			err = process.Kill()
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		case "STOP":
			err = process.Signal(syscall.SIGSTOP)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
		w.WriteHeader(http.StatusOK)
	default:
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
}
