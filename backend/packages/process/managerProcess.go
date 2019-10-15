package proc

import (
	"bufio"
	"bytes"
	"crypto/md5"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"sync"
	"syscall"
	"time"

	"path/filepath"
)

// GetProcessRunningStatus return status process in system by PID
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
	var iterations int
	for !flagEnd {
		time.Sleep(time.Second * 1)
		if pingCmd == nil {
			*pingMsgChan <- "%none%"
			flagEnd = true
		} else {
			x, _ := GetProcessStatus(pingCmd.Process.Pid)
			flagEnd = x == nil
			read := bufio.NewReader(pingCmd.Stdout.(io.Reader))
			var lines []string = make([]string, 0)
			for {
				if line, err := read.ReadString('\n'); err == nil {
					if len(line) > 70 {
						lines = append(lines, line)
					}
				} else {
					break
				}
			}
			if len(lines) > 0 {
				*pingMsgChan <- lines[len(lines)-1]
			} else {
				*pingMsgChan <- "%none%"
			}
			iterations += 2
		}
	}
	*pingMsgChan <- "%end%"
}

func StartProcess(msg *chan string, nameCommand string, argsCommand ...string) (pCmd *exec.Cmd, err error) {
	var pRun chan bool = make(chan bool, 1)
	pCmd = exec.Command(nameCommand, argsCommand...)
	var out bytes.Buffer
	if msg != nil {
		pCmd.Stdout = &out
	}

	go func(fCmd *exec.Cmd, fRun *chan bool, fMsg *chan string) {
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

func saveFile(fullPath string, fileText []byte) error {
	var lock sync.Mutex
	lock.Lock()

	f, err := os.Create(fullPath)
	if err != nil {
		return err
	}
	_, err = io.Copy(f, bytes.NewReader(fileText))
	if err != nil {
		return err
	}
	f.Close()
	lock.Unlock()
	log.Println("[proc -> managerProcess.go]: Save file: ", fullPath)
	return nil
}

func deleteFile(fullPath string) error {
	var lock sync.Mutex
	lock.Lock()

	err := os.Remove(fullPath)
	if err != nil {
		return err
	}
	lock.Unlock()
	log.Println("[proc -> managerProcess.go]: Deleted file: ", fullPath)
	return nil
}

// StartScripts function start in goroutine shell script
func StartScripts(text string) (pCmd *exec.Cmd, err error) {

	dir := "./src/tmpScripts/"
	path := "script__" + time.Now().String()
	log.Println(filepath.Join(dir, path))
	fullPath := filepath.Join(dir, fmt.Sprintf("%x", md5.Sum([]byte(path))))
	err = saveFile(fullPath, []byte(text))
	if err != nil {
		return nil, err
	}

	var pRun chan bool = make(chan bool, 1)
	pCmd = exec.Command("sh", fullPath)

	go func(fCmd *exec.Cmd, fRun *chan bool) {
		if err := fCmd.Start(); err != nil {
			*fRun <- false
		} else {
			log.Println("[proc -> managerProcess.go]: Start script from file: ", fullPath)
			log.Println("[proc -> managerProcess.go]: Start process: ", fCmd.Process.Pid)
			*fRun <- true
			fCmd.Wait()
			log.Println("[proc -> managerProcess.go]: Stop process: ", fCmd.Process.Pid)
		}
		err = deleteFile(fullPath)
		if err != nil {
			log.Println(err)
		}
	}(pCmd, &pRun)

	if <-pRun {
		return pCmd, nil
	}
	return nil, errors.New("Can't start process")
}
