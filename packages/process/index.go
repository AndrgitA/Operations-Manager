package proc

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"syscall"
)

// type Process struct {
// 	PID      int    // PID Процесса
// 	PPID     int    // PID Родител процесса
// 	HostName string // Hostname Процесса
// 	WD       string // Корневое имяя пути текущего каталога
// }

type Process struct {
	C       uint   // Значение загрузки процессора
	COMMAND string // Имя и аргументы команды
	MEM     uint   // Часть реальной памяти (%), используемая процессом
	PID     uint   // Идентификатор процесса
	PGID    uint   // Индентификатор группы
	PPID    uint   // Идентификатор родительского процесса
	PSR     uint   // Процесс, которому в данный момент назначен процесс
	RSS     uint   // Размер резидентного набора (количество страниц памяти)
	SID     uint   // Идентификатор сеанса
	START   string // Время создания процесса
	STAT    string /*
		Текущий статус процесса:
			R — выполняется
			D — ожидает записи на диск
			S — неактивен (< 20 с)
			T — приостановлен
			Z — зомби
			Дополнительные флаги:
			W — процесс выгружен на диск
			< — процесс имеет повышенный приоритет
			N — процесс имеет пониженный приоритет
			L — некоторые страницы блокированы в оперативной памяти
			s — процесс является лидером сеанса
	*/
	SZ    uint   // Размер в физических страницах основного образа процесса
	TIME  string // Количество времени ЦП, затраченное на выполнение процесса
	TPGID int    // Идентификатор группы процессов переднего плана на TTY (терминале), к которому подключен процесс, или -1 если процесс не связан с TTY
	TTY   string // Идентификатор управляяющего терминала
	UID   uint   // Эффективный идентификатор пользователя
	USER  string // Имя владельца процесса
	VSZ   uint   // Виртуальный размер процесса
}

func GetRunningProcesses() map[uint]Process {
	// var m map[uint]Process
	return nil
}

func getProcessRunningStatus(pid int) (*os.Process, error) {
	proc, err := os.FindProcess(pid)
	if err != nil { // Процесс не найден
		return nil, err
	}

	err = proc.Signal(syscall.Signal(0))
	if err == nil {
		return proc, nil
	}
	GetRunningProcesses()
	if err == syscall.ESRCH {
		return nil, errors.New("Process not running")
	}

	// default
	return nil, errors.New("process running but query operation not permitted!")
}

func ExecCommand(nameCommand string, argsCommand ...string) (string, error) {
	// cmd := exec.Command("bash", "-c", "ps -eAF")
	//cmd := exec.Command("bash", "-c", "ps aux")
	cmd := exec.Command(nameCommand, argsCommand...)
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return "", err
	}
	return out.String(), nil
}

func GetProcessInfo(pid uint) (*Process, error) {
	var proc *Process = new(Process)
	var command string = "ps -p " + strconv.Itoa(int(pid)) + " -o c,%mem=MEM,pid,pgid,ppid,psr,rss,sid,start=START,stat,sz,time,tpgid,tty,uid,user,vsz,cmd"
	const countParams int = 18

	fmt.Println(command)

	out, _ := ExecCommand("bash", "-c", command)
	var lines []string = strings.Split(out, "\n")
	var stringSplit []string
	for i := 1; i < len(lines); i++ {
		stringSplit = strings.Split(lines[i], " ")
		for j := 0; j < len(stringSplit); j++ {
			if stringSplit[j] != "" {
				fmt.Println(stringSplit[j], ", ")
			}
		}
	}
	return proc, nil
}

func (p Process) ToString() string {
	var str string = fmt.Sprintf("Process Information:\n"+
		"\tPID Process: \t%d;\n"+
		"\tPID Parent: \t%d;\n", p.PID, p.PPID)
	return str
}
