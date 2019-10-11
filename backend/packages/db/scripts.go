package dbm

import (
	"errors"
)

// GetScripts return all scripts by token (for user_id)
func (db *DB) GetScripts(userID int) ([]*ScriptHttp, error) {

	rows, err := db.db.Query("select script_id, text, position from scripts where user_id = $1", userID)
	if err != nil {
		return nil, err
	}

	var scripts []*ScriptHttp = make([]*ScriptHttp, 0)
	for rows.Next() {
		script := &ScriptHttp{}
		err := rows.Scan(&script.ID, &script.Text, &script.Position)
		if err == nil {
			scripts = append(scripts, script)
		}
	}
	return scripts, nil
}

// InsertScript add script txt
func (db *DB) InsertScript(userID, position int, text string) error {
	result, err := db.db.Exec("insert into scripts (text, position, user_id) values ($1, $2, $3);", text, position, userID)
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
func (db *DB) UpdateScript(script_id, position int, text string) error {

	result, err := db.db.Exec("update scripts set text = $1, position = $2 where script_id = $3;", text, position, script_id)
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

func (db *DB) DeleteScript(script_id int) error {

	result, err := db.db.Exec("delete from scripts where script_id = $1;", script_id)
	if err != nil {
		return err
	}
	c, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if c == 0 {
		return errors.New("not delete")
	}
	return nil
}
