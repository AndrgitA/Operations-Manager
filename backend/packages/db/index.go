package dbm

/**
  dbm - Data Base Manager
*/
import (
	"database/sql"
	"encoding/base64"
	"fmt"

	// pq package
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

// DB struct for work with DB Postgresql
type DB struct {
	db       *sql.DB
	user     string
	password string
	name     string
}

// NewDB create new Struct DB without db
func NewDB(user, password, name string) *DB {
	return &DB{
		db:       nil,
		user:     user,
		password: password,
		name:     name}
}

// Connect method connect to db
func (db *DB) Connect() error {
	var dbInfo string = fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", db.user, db.password, db.name)
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

// GenerateToken generate token by string
func GenerateToken(str string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)
	if err != nil {
		return ""
	}
	return base64.StdEncoding.EncodeToString(hash)
}
