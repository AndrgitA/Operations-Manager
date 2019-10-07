package serv

import (
	"log"
	"net/http"
	"strconv"

	dbm "../db"
)

// Server struct server meta
type Server struct {
	host string
	port uint
	mux  *http.ServeMux
	db   *dbm.DB
}

// CreateServer create server
func CreateServer(host string, port uint) *Server {
	return &Server{
		host: host,
		port: port,
		mux:  http.NewServeMux(),
		db:   nil}
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

// Start run server
func (server *Server) Start(db *dbm.DB) error {
	server.db = db
	var address string = server.host + ":" + strconv.Itoa(int(server.port))
	homeHandle := http.HandlerFunc(home)
	server.mux.HandleFunc("/", authMiddleWare(homeHandle))
	err := http.ListenAndServe(address, server.mux)
	if err != nil {
		return err
	}
	return nil
}
