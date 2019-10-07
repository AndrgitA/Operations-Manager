package dbm

/**
  dbm - Data Base Manager
*/
import (
	"database/sql"
	"fmt"

	// pq package
	_ "github.com/lib/pq"
)

// DB struct for work with DB Postgresql
type DB struct {
	db       *sql.DB
	User     string
	password string
	Name     string
}

// NewDB create new Struct DB without db
func NewDB(user, password, name string) *DB {
	return &DB{
		db:       nil,
		User:     user,
		password: password,
		Name:     name}
}

// Connect method connect to db
func (db *DB) Connect() error {
	var dbInfo string = fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", db.User, db.password, db.Name)
	d, err := sql.Open("postgres", dbInfo)
	if err != nil {
		return err
	}
	db.db = d
	return nil
}

// Close method close db
func (db *DB) Close() error {
	err := db.db.Close()
	if err != nil {
		return err
	}
	return nil
}
