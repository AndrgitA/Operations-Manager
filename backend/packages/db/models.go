package dbm

import "fmt"

type Role string

const (
	ROLE_ADMIN Role = "ADMIN"
	ROLE_USER  Role = "USER"
)

type PostLoginHttp struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type UserHttp struct {
	ID    int    `json:"id"`    //	Идентификатор пользователя в бд
	Role  Role   `json:"role"`  //	Проль пользователя
	Login string `json:"login"` // 	Логин пользователя
	Token string `json:"token"` // 	Токен пользователя
}

type ProcessHttp struct {
	C       uint   `json:"c"`     // 	Значение загрузки процессора
	COMMAND string `json:"cmd"`   // 	Имя и аргументы команды
	MEM     uint   `json:"mem"`   // 	Часть реальной памяти (%), используемая процессом
	PID     uint   `json:"pid"`   // 	Идентификатор процесса
	PGID    uint   `json:"pgid"`  //	Индентификатор группы
	PPID    uint   `json:"ppid"`  //	Идентификатор родительского процесса
	PSR     uint   `json:"psr"`   //	Процесс, которому в данный момент назначен процесс
	RSS     uint   `json:"rss"`   //	Размер резидентного набора (количество страниц памяти)
	SID     uint   `json:"sid"`   //	Идентификатор сеанса
	START   string `json:"start"` //	Время создания процесса
	STAT    string `json:"stat"`  /*
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
	SZ    uint   `json:"sz"`    //	Размер в физических страницах основного образа процесса
	TIME  string `json:"time"`  //	Количество времени ЦП, затраченное на выполнение процесса
	TPGID int    `json:"tpgid"` //	Идентификатор группы процессов переднего плана на TTY (терминале), к которому подключен процесс, или -1 если процесс не связан с TTY
	TTY   string `json:"tty"`   //	Идентификатор управляяющего терминала
	UID   uint   `json:"uid"`   //	Эффективный идентификатор пользователя
	USER  string `json:"user"`  //	Имя владельца процесса
	VSZ   uint   `json:"vsz"`   //	Виртуальный размер процесса
}

type PostProcessHttp struct {
	Signal string `json:"signal"`
}

type PostProcessesHttp struct {
	CMD        string `json:"cmd"`
	Attributes string `json:"attributes`
}

type StatusScript string

const (
	STATUS_SCRIPT_DELETE      StatusScript = "DELETE"
	STATUS_SCRIPT_START       StatusScript = "START"
	STATUS_SCRIPT_NEW         StatusScript = "NEW"
	STATUS_SCRIPT_NOT_CHANGED StatusScript = "NOT_CHANGED"
	STATUS_SCRIPT_UPDATE      StatusScript = "UPDATE"
)

type ScriptHttp struct {
	ID       int    `json:"id"`       //	Идентификатор скрипта в бд
	Position int    `json:"position"` // 	Приоритет отображения
	Text     string `json:"text"`     // 	Логин пользователя
}

func (s *ScriptHttp) String() string {
	return fmt.Sprintf("ScriptHttp:\n"+
		"\tID: %d\n"+
		"\tPosition: %d\n"+
		"\tText: %s\n", s.ID, s.Position, s.Text)
}

type PostScriptHttp struct {
	ID       int          `json:"id"`       //	Идентификатор скрипта в бд или -1, если новый
	Position int          `json:"position"` // 	Приоритет отображения
	Text     string       `json:"text"`     // 	Логин пользователя
	Status   StatusScript `json:"status"`   //  Статус действия
}

func (s *PostScriptHttp) String() string {
	return fmt.Sprintf("PostScriptHttp:\n"+
		"\tID: %d\n"+
		"\tPosition: %d\n"+
		"\tText: %s\n"+
		"\tStatus: %s\n", s.ID, s.Position, s.Text, s.Status)
}
