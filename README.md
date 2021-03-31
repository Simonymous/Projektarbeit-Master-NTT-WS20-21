# projektarbeit-ntt

## Docker Compose Integration

In ./backend-main und ./frontend-main sollte zuvor ein
```
npm install
```
erfolgen
Docker Compose start mit

```
docker compose up
```

Wird die vorkonfigurierte docker-compose yml verwendet, erreicht man unter folgenden ports die Komponenten:
Frontend:
```
url:8080
```
Backend:
```
url:3000
```
Mongodb Viewer:
```
url:8081
```
Mongodb:
```
url:27017
```
Alternativ können auch Backend und Frontend seperat gestartet werden.
WICHTIG: Es ist zwingend notwendig, eine eigene MongoDB zu betreiben.
Diese kann entsprechend in der config des backends eingetragen werden.

Wichtig:
in Moodle wird das Tool folgendermaßen konfiguriert:
```
taskId=XXXTASKIDXXX
```

Dokus:  
- Doku Frontend: ./frontend-main/README.md
- Doku Backend: ./backend-main/README.md
