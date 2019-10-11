package main

import (
	"fmt"

	dbm "./packages/db"
	serv "./packages/server"
)

func main() {
	db := dbm.NewDB("manager", "manager94go", "operations_manager_app")
	err := db.Connect()
	if err != nil {
		fmt.Println("ERROR CONNECT: ", err)
		return
	}

	// server := serv.CreateServer("localhost", 8888, db)
	server := serv.CreateServer("37.146.185.71", 8888, db)
	err = server.Start()
	if err != nil {
		fmt.Println("ERROR START SERVER: ", err)
	}
	err = db.Close()
	if err != nil {
		fmt.Println("ERROR CLOSE DB: ", err)
		return
	}
}
