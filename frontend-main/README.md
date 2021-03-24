# Dev Doku


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Architektur



# User Doku
## Sign Up
<https://server.de/signup>  
Falls ein User noch nicht Registriert ist, kann er sich im Sign Up einen neuen Account erstellen. Dieser Account wird vorallem von Exercise Ersteller und Nutzer gebraucht, welche nicht über Moodle auf die Platform zugreifen möchten.

Eingabe:

- Username 
- Password
- Email

## Login
<https://server.de/login>  
Im Login kann sich ein Nutzer auf der Seite anmelden. Dafür muss zuvor ein erfolgreiche Registrierung vollzogen werden. 

Eingabe:

- Username
- Password

## Exercise Management
<https://server.de/?component=ExerciseManagement%2FOverview>  
Auf das Exercise Management haben nur User mit einem Dozent oder Admin Account Zugriff. Für andere User ist diese Ansicht nicht verfügbar.

Im Exercise Management kann der User Aufgaben und Aufgabenblätter: 
- erstellen
- bearbeiten
- löschen
- suchen

Des Weiteren besteht die Möglichkeit Aufgaben oder Aufgabenblätter zu importieren oder exportieren. 

Beim Importieren können sowohl Aufgaben als auch Aufgabenblätter gewählt werden. 

Vorraussetzungen:

- Datei muss im JSON Format sein (Array of Tasks/TaskCollections)
- Nur eine einzige Datei kann zur gleichen Zeit importiert werden.
- Datei kann sowohl Aufgaben als auch Aufgabenblätter enthalten.
- Zu einem Aufgabenblatt müssen auch die entsprechenden Aufgaben in der Datei enthalten sein. 

Aufbau Aufgabe in JSON Datei:

Siehe Aufbau Aufgabe!

- (Titel: String) Titel der Aufgabe
- (description: String) Beschreibung der Aufgabe
- (type: String) Typ der Exercise in disem fall "Task"
- (creator: String) Name des Benutzers welcher die Task erstellt
- (tags: String[]) Suchtags für die später Aufgabensuche
- (Course: String) Fach für das die Task erstellt wird
- (PluginCode: String) Art des Plugin in dem die Task erstellt wird
- (dataForPlugin: {}) Alle möglichen Daten und Informationen die die Task für das entsprechende Plugin benötigt
- (openTests: any[]) Enthält die offenen Tests für die Aufgabe. Diese werden dem Benutzer später zur Überprüfung seiner Eingabe bereit gestellt
- (closedTests: any[]) Enthält die verdeckten Tests für die Aufgabe. Diese wärden dem Benutzer nicht angezeigt sondern bilden die Grundlage für die Bewertung der Aufgabe.  

TaskCollection Interface: 

    title: string,
    description: string,
    type:string,
    creator: string,
    tags: string[],
    course: string,
    tasks: {
        _id: string,
        weighting: number,
        taskName: string
    }[]

Task Interface:

    title: string,
    description: string,
    creator: string,
    type: string,
    tags: string[],
    course: string,
    pluginCode: string,
    dataForPlugin: any,
    closedTests: [],
    openTests: [],


## Solving Exercises

## User Management


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
