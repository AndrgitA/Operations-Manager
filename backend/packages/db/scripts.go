package dbm

import (
	"errors"
	"log"
)

// GetScripts return all scripts by token (for user_id)
func (db *DB) GetScripts(token string) ([]*ScriptHttp, error) {
	var userID int
	row := db.db.QueryRow("select users.user_id from tokens, users where token = $1;", token)

	err := row.Scan(&userID)
	if err != nil {
		return nil, err
	}

	rows, err := db.db.Query("select script_id, text from scripts where user_id = $1", userID)
	if err != nil {
		return nil, err
	}

	var scripts []*ScriptHttp = make([]*ScriptHttp, 0)
	for rows.Next() {
		script := &ScriptHttp{}
		err := rows.Scan(&script.ID, &script.Text)
		if err == nil {
			scripts = append(scripts, script)
		}
	}
	log.Println("SCRIPTS: ", scripts)
	return scripts, nil
}

// InsertScript add script txt
func (db *DB) InsertScript(token, text string) error {
	var userID int
	row := db.db.QueryRow("select users.user_id from tokens, users where token = $1;", token)

	err := row.Scan(&userID)
	if err != nil {
		return err
	}
	result, err := db.db.Exec("insert into scripts (text, user_id) values ($1, $2);", text, userID)
	if err != nil {
		return err
	}
	c, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if c == 0 {
		return errors.New("not added")
	}
	return nil
}

// UpdateScript update text in script
func (db *DB) UpdateScript(script_id, text string) error {

	result, err := db.db.Exec("update scripts set text = $1 where script_id = $2;", text, script_id)
	if err != nil {
		return err
	}
	c, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if c == 0 {
		return errors.New("not update")
	}
	return nil
}
