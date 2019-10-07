package db

type Role string

const (
	ROLE_ADMIN Role = "ADMIN"
	ROLE_USER  Role = "USER"
)

type User struct {
	id       int
	role     Role
	login    string
	password string
}
