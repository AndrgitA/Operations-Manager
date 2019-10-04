package proc

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"syscall"
	"time"
)

// getProcessRunningStatus return status process in system by PID
func GetProcessStatus(pid int) (*os.Process, error) {
	proc, err := os.FindProcess(pid)
	if err != nil { // Процесс не найден
		return nil, err
	}

	err = proc.Signal(syscall.Signal(0))
	// fmt.Println(proc)
	if err == nil {
		return proc, nil
	}
	if err == syscall.ESRCH {
		return nil, errors.New("Process not running")
	}

	// default
	return nil, errors.New("process running but query operation not permitted!")
}

func pingMessage(pingCmd *exec.Cmd, pingMsgChan *chan string) {
	var flagEnd bool = false
	var i int
	for !flagEnd {
		time.Sleep(time.Second * 1)
		if pingCmd == nil {
			*pingMsgChan <- "gg"
			flagEnd = true
		} else {
			x, _ := GetProcessStatus(pingCmd.Process.Pid)
			flagEnd = x == nil
			// *pingMsgChan <- strconv.Itoa(i)
			var b []byte
			pingCmd.Stdout.Write(b) // TODO: Need set stdout data and clear this Writer
			fmt.Println(b, pingCmd.Stdout)
			*pingMsgChan <- "123"
		}
		i++
		// *pingMsgChan <- b.String()
	}
	*pingMsgChan <- "end"
	// *pingMsgChan = chan string(nil)
}

func StartProcess(msg *chan string, nameCommand string, argsCommand ...string) (pCmd *exec.Cmd, err error) {
	var pRun chan bool = make(chan bool, 1)
	var out bytes.Buffer
	pCmd = exec.Command(nameCommand, argsCommand...)
	pCmd.Stdout = &out

	go func(fCmd *exec.Cmd, fRun *chan bool, fMsg *chan string) {
		fmt.Println("IN LEVEL 0: ", fCmd, fCmd.ProcessState)
		if err := fCmd.Start(); err != nil {
			*fRun <- false
		}
		if fMsg != nil {
			go pingMessage(fCmd, fMsg)
		}
		*fRun <- true
		fCmd.Wait()
	}(pCmd, &pRun, msg)

	if <-pRun {
		return pCmd, nil
	}
	return nil, errors.New("Can't start process")
}
