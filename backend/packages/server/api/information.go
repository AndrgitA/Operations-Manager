package api

import (
	"encoding/json"
	"net/http"
	"syscall"

	"github.com/zcalusic/sysinfo"
)

func informationHandle(w http.ResponseWriter, r *http.Request, userID int) {
	SetupResponse(&w, r)
	if userID == -1 && r.Method != "OPTIONS" {
		http.Error(w, "Error server", http.StatusInternalServerError)
		return
	}
	switch r.Method {
	case "GET":
		sInfo := syscall.Sysinfo_t{}
		syscall.Sysinfo(&sInfo)
		info := sysinfo.SysInfo{}
		info.GetSysInfo()
		json.NewEncoder(w).Encode(map[string]interface{}{"systemInfo": sInfo, "packageInfo": info})
	case "OPTIONS":
		w.WriteHeader(http.StatusOK)
	default:
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
}
