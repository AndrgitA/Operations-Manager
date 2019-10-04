package main

import (
	"fmt"
	"time"

	proc "./packages/process"
)

func Timeout(f func(), t time.Duration) {
	c := make(chan bool, 1)
	go func() {
		time.Sleep(t)
		c <- true
	}()
	<-c
	f()
}

func main() {
	// infoProcess, _ := proc.GetProcessInfo(uint(os.Getpid()))
	// allProcesses, _ := proc.GetRunningProcesses()
	// fmt.Println(infoProcess)
	// for k := range allProcesses {
	// 	fmt.Println("PID: ", k, "Value: ", allProcesses[k])
	// }
	// stdout := os.NewFile(uintptr(syscall.Stdout), "./tmpName")
	// r, w, _ := os.Pipe()
	// if p, err := proc.StartProcess([]*os.File{os.Stdin, w, os.Stderr}, "ping", "-c 3", "www.google.com"); err == nil {
	// 	// check := func() {
	// 	// 	x, _ := proc.GetProcessStatus(p.Pid)
	// 	// 	if x != nil {
	// 	// 		fmt.Println(i)
	// 	// 		i++
	// 	// 	}
	// 	// }
	// 	c := make(chan bool, 1)
	// 	// Timeout(check, time.Second*1)
	// 	goFunc := func(pr *os.Process, ch *chan bool) {
	// 		var x *os.Process
	// 		var flagEnd bool = false
	// 		for !flagEnd {
	// 			x, _ = proc.GetProcessStatus(pr.Pid)
	// 			time.Sleep(time.Second * 1)
	// 			flagEnd = x == nil
	// 			var b []byte
	// 			z, _ := w.Read(b)
	// 			fmt.Println(r, z, b)
	// 			fmt.Println("IS DONE: ", flagEnd)
	// 		}
	// 		*ch <- true
	// 	}
	// 	go goFunc(p, &c)
	// 	p.Wait()
	// 	y := <-c
	// 	fmt.Println(y)

	// 	// stat, err := proc.Wait()

	// 	// fmt.Println("PROC: ", proc)
	// } else {
	// 	fmt.Println(err)
	// }
	// w.Close()
	// // stdout.Seek(0, os.SEEK_SET)
	// out, _ := ioutil.ReadAll(r)
	// r.Close()
	// fmt.Println(string(out))
	var msg chan string = make(chan string, 1)
	if cmdProc, err := proc.StartProcess(&msg, "ping", "-c 10", "www.google.com"); err == nil {
		// if cmdProc, err := proc.StartProcess(&msg, "watch", " ls", "-l"); err == nil {
		fmt.Println(cmdProc)
		// go func(m *chan string) {
		for {
			s := <-msg
			fmt.Println(s)
			if s == "end" {
				break
			}
		}
		// }(&msg)
	}

}
