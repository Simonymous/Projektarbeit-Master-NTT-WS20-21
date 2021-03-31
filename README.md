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
![Alt text](https://github.com/Simonymous/maprojektarbeit-ntt/blob/develop/moodleConfig.PNG "Moodle Config")
Dabei wird in den custom Parameters (Angepasste Parameter) die taskID folgendermaßen eingetragen:
```
taskId=XXXTASKIDXXX
```
Anwenderschlüssel (consumer_key) und Öffentliches Kennwort (shared_secret) müssen entsprechend in der Backend config.json (siehe Backend Dokumentation) angepasst werden.
Wichtig ist hier auch die Url mit /auth/moodleLogin, welche automatisch eine moodle LTI session initiiert

Dokus:  
- Doku Frontend: ./frontend-main/README.md
- Doku Backend: ./backend-main/README.md
