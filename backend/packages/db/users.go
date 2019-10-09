package dbm

import (
	"crypto/md5"
	"errors"
	"fmt"
	"time"
)

// GetUserByToken find user by token
func (db *DB) GetUserByToken(token string) (*UserHttp, error) {
	row := db.db.QueryRow("select users.user_id, role, login, token from tokens, users where token = $1;", token)
	u := &UserHttp{}
	err := row.Scan(&u.ID, &u.Role, &u.Login, &u.Token)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (db *DB) GetUser(login, password string) (*UserHttp, error) {
	h := fmt.Sprintf("%x", md5.Sum([]byte(password)))
	row := db.db.QueryRow("select user_id, login, role from users where login = $1 and password = $2;", login, h)
	if row == nil {
		return nil, errors.New("not found")
	}
	user := &UserHttp{}
	err := row.Scan(&user.ID, &user.Login, &user.Role)
	if err != nil {
		return nil, err
	}
	token := GenerateToken(login + time.Now().String())
	result, err := db.db.Exec("insert into tokens (token, user_id) values($1, $2)", token, user.ID)
	if err != nil {
		return nil, err
	}
	c, err := result.RowsAffected()
	if err != nil || c != 1 {
		return nil, err
	}
	user.Token = token

	return user, nil
}
