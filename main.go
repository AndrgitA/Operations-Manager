package main

import (
	"fmt"
	"os"

	proc "./packages/process"
)

func main() {
	// HostName, errHost := os.Hostname()
	// if errHost != nil {
	// 	os.Exit(0)
	// }
	infoProcess, _ := proc.GetProcessInfo(uint(os.Getpid()))

	fmt.Printf(infoProcess.ToString())
}
