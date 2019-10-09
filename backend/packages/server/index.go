package serv

import (
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	dbm "../db"
	api "./api"
	mux "github.com/gorilla/mux"
)

// spaHandler implements the http.Handler interface
type spaHandler struct {
	staticPath string
	indexPath  string
}

// Server struct server meta
type Server struct {
	server *http.Server
	db     *dbm.DB
	spa    *spaHandler
}

func (h *spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if failed to get the absolute path respond with a 400 bad request and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)
	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, server index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error stating the file, return a 500 internal server  error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

// CreateServer create server
func CreateServer(host string, port uint, db *dbm.DB) *Server {
	var address string = host + ":" + strconv.Itoa(int(port))
	router := mux.NewRouter()
	server := &http.Server{
		Handler:      router,
		Addr:         address,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second}

	spa := &spaHandler{staticPath: "../frontend/dist", indexPath: "../frontend/dist/index.html"}
	return &Server{
		server: server,
		db:     db,
		spa:    spa}
}

// Start run server
func (s *Server) Start() error {
	var router *mux.Router = s.server.Handler.(*mux.Router)

	//register all api
	api.InitRouter(router, s.db)

	// static files
	router.PathPrefix("/").Handler(s.spa)

	err := s.server.ListenAndServe()
	if err != nil {
		return err
	}
	return nil
}
