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

	utils "../utils"
)

type Process struct {
	C       utils.Value // uint 	Значение загрузки процессора
	COMMAND utils.Value // string	Имя и аргументы команды
	MEM     utils.Value // uint		Часть реальной памяти (%), используемая процессом
	PID     utils.Value // uint		Идентификатор процесса
	PGID    utils.Value // uint		Индентификатор группы
	PPID    utils.Value // uint		Идентификатор родительского процесса
	PSR     utils.Value // uint		Процесс, которому в данный момент назначен процесс
	RSS     utils.Value // uint		Размер резидентного набора (количество страниц памяти)
	SID     utils.Value // uint		Идентификатор сеанса
	START   utils.Value // string	Время создания процесса
	STAT    utils.Value /* string
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
		l — является многопоточным
		+ — находитсяя на переднем плане процесса группы.
		I — процесс в состоянии простоя
	*/
	SZ    utils.Value // uint		Размер в физических страницах основного образа процесса
	TIME  utils.Value // string		Количество времени ЦП, затраченное на выполнение процесса
	TPGID utils.Value // int		Идентификатор группы процессов переднего плана на TTY (терминале), к которому подключен процесс, или -1 если процесс не связан с TTY
	TTY   utils.Value // string		Идентификатор управляяющего терминала
	UID   utils.Value // uint		Эффективный идентификатор пользователя
	USER  utils.Value // string		Имя владельца процесса
	VSZ   utils.Value // uint		Виртуальный размер процесса
}

func GetStateName(symbol byte) string {
	switch symbol {
	case 'R':
		return "выполняется"
	case 'D':
		return "ожидает записи на диск"
	case 'S':
		return "неактивен (< 20 с)"
	case 'T':
		return "приостановлен"
	case 'Z':
		return "зомби"
	case 'W':
		return "процесс выгружен на диск"
	case '<':
		return "процесс имеет повышенный приоритет"
	case 'N':
		return "процесс имеет пониженный приоритет"
	case 'L':
		return "некоторые страницы блокированы в оперативной памяти"
	case 's':
		return "процесс является лидером сеанса"
	case 'l':
		return "является многопоточным"
	case '+':
		return "находитсяя на переднем плане процесса группы"
	case 'I':
		return "Процесс в состоянии простоя"
	default:
		return ""
	}
}

func (p *Process) String() string {
	var strStat string = ""
	var stat string = p.STAT.Value.(string)
	var tmp string
	if len(stat) != 0 {
		for i := 0; i < len(stat); i++ {
			tmp = GetStateName(byte(stat[i]))
			if len(tmp) != 0 {
				strStat += "\n\t\t\t\t - " + tmp + ";"
			}
		}
	}
	var str string = fmt.Sprintf("Process Information\":\n"+
		"\t[PPID   ]  %d\t \"Идентификатор родительского процесса\";\n"+
		"\t[PID    ]  %d\t \"Идентификатор процесса\";\n"+
		"\t[PGID   ]  %d\t \"Индентификатор группы\";\n"+
		"\t[SID    ]  %d\t\t \"Идентификатор сеанса\";\n"+
		"\t[UID    ]  %d\t\t \"Эффективный идентификатор пользователя\";\n"+
		"\t[TPGID  ]  %d\t \"Ид. группы процессов переднего плана\";\n"+
		"\t[PSR    ]  %d\t\t \"Процесс, которому в данный момент назначен процесс\";\n"+
		"\t[RSS    ]  %d\t\t \"Размер резидентного набора\";\n"+
		"\t[TTY    ]  %s\t \"Идентификатор управляяющего терминала\";\n"+
		"\t[C      ]  %d\t\t \"Значение загрузки процессора\";\n"+
		"\t[MEM    ]  %d\t\t \"Часть реальной памяти (%%), используемая процессом\";\n"+
		"\t[SZ     ]  %d\t \"Размер в физических страницах основного образа процесса\";\n"+
		"\t[VSZ    ]  %d\t \"Виртуальный размер процесса\";\n"+
		"\t[START  ]  %s\t \"Время создания процесса\";\n"+
		"\t[TIME   ]  %s\t \"Количество времени ЦП, затраченное на выполнение\";\n"+
		"\t[STAT   ]  %s\t\t \"Текущий статус процесса\": %s\n"+
		"\t[USER   ]  %s\t \"Имя владельца процесса\";\n"+
		"\t[COMMAND] %s\t \"Имя и аргументы команды\";\n", p.PPID.Value, p.PID.Value, p.PGID.Value,
		p.SID.Value, p.UID.Value, p.TPGID.Value, p.PSR.Value,
		p.RSS.Value, p.TTY.Value, p.C.Value, p.MEM.Value,
		p.SZ.Value, p.VSZ.Value, p.START.Value, p.TIME.Value,
		p.STAT.Value, strStat, p.USER.Value, p.COMMAND.Value)

	return str
}

func GetRunningProcesses() (map[uint]*Process, error) {
	// var m map[uint]Process
	var procs map[uint]*Process = make(map[uint]*Process)
	var proc *Process
	var command string = "ps -eAo c,%mem=MEM,pid,pgid,ppid,psr,rss,sid,start=START,stat,sz,time,tpgid,tty,uid,user,vsz,cmd"
	const countParams uint = 18
	var key uint
	// fmt.Println(command)

	out, err := ExecCommand("bash", "-c", command)
	if err != nil {
		return nil, err
	}
	array := ParseDataPS(out, countParams)
	if array == nil || len(array) == 0 {
		return nil, errors.New("Not found result")
	}
	for i := 0; i < len(array); i++ {
		proc = getProcessByParams(array[i])
		if proc != nil {
			key = proc.PID.Value.(uint)
			procs[key] = proc
		}
	}
	return procs, nil
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
	cmd := exec.Command(nameCommand, argsCommand...)
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return "", err
	}
	return out.String(), nil
}

// index  : -> 0,1       ,2  ,3   ,4   ,5  ,6  ,7  ,8          ,9   ,10,11  ,12   ,13 ,14 ,15  ,16 ,17  .
// params : -> c,%mem=MEM,pid,pgid,ppid,psr,rss,sid,start=START,stat,sz,time,tpgid,tty,uid,user,vsz,cmd .
func getProcessByParams(params []string) *Process {
	if len(params) != 18 {
		return nil
	}
	var process *Process = &Process{
		C:       utils.ConvertString(utils.Uint, params[0]),
		COMMAND: utils.ConvertString(utils.String, params[17]),
		MEM:     utils.ConvertString(utils.Uint, params[1]),
		PID:     utils.ConvertString(utils.Uint, params[2]),
		PGID:    utils.ConvertString(utils.Uint, params[3]),
		PPID:    utils.ConvertString(utils.Uint, params[4]),
		PSR:     utils.ConvertString(utils.Uint, params[5]),
		RSS:     utils.ConvertString(utils.Uint, params[6]),
		SID:     utils.ConvertString(utils.Uint, params[7]),
		START:   utils.ConvertString(utils.String, params[8]),
		STAT:    utils.ConvertString(utils.String, params[9]),
		SZ:      utils.ConvertString(utils.Uint, params[10]),
		TIME:    utils.ConvertString(utils.String, params[11]),
		TPGID:   utils.ConvertString(utils.Int, params[12]),
		TTY:     utils.ConvertString(utils.String, params[13]),
		UID:     utils.ConvertString(utils.Uint, params[14]),
		USER:    utils.ConvertString(utils.String, params[15]),
		VSZ:     utils.ConvertString(utils.Uint, params[16])}
	return process
}

// ParseDataPS result from command ps -eo args...
func ParseDataPS(str string, countParams uint) [][]string {
	var lines []string = strings.Split(str, "\n")
	var funcResult [][]string = make([][]string, 0)
	var stringSplit []string
	var innerResultArray []string
	var innerIndex int
	var tmpString string
	for i := 1; i < len(lines); i++ {
		stringSplit = strings.Split(lines[i], " ")
		innerIndex = 0
		innerResultArray = make([]string, countParams)
		if len(stringSplit) >= int(countParams) {
			for j := 0; j < len(stringSplit); j++ {
				if stringSplit[j] != "" {
					if innerIndex == int(countParams-1) {
						tmpString = strings.Join(stringSplit[j:], "")
						j = len(stringSplit)
					} else {
						tmpString = stringSplit[j]
					}
					innerResultArray[innerIndex] = tmpString
					innerIndex++
				}
			}
			if innerIndex == int(countParams) {
				funcResult = append(funcResult, innerResultArray)
			}
			fmt.Println(lines[i], "\n", innerResultArray)
		}
	}
	if len(funcResult) == 0 {
		return nil
	}
	return funcResult
}

func GetProcessInfo(pid uint) (*Process, error) {
	var proc *Process = new(Process)
	var command string = "ps -p " + strconv.Itoa(int(pid)) + " -o c,%mem=MEM,pid,pgid,ppid,psr,rss,sid,start=START,stat,sz,time,tpgid,tty,uid,user,vsz,cmd"
	const countParams uint = 18

	// fmt.Println(command)

	out, err := ExecCommand("bash", "-c", command)
	if err != nil {
		return nil, err
	}
	array := ParseDataPS(out, countParams)
	if array == nil || len(array) != 1 {
		return nil, errors.New("Not found result")
	}
	proc = getProcessByParams(array[0])
	return proc, nil
}
