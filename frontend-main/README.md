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

# User Doku
## Sign Up
<https://server.de/signup>  
Falls ein User noch nicht Registriert ist, kann er sich im Sign Up einen neuen Account erstellen. Dieser Account wird vorallem von Exercise Ersteller und Nutzer gebraucht, welche nicht über Moodle auf die Plattform zugreifen möchten.

Eingabe:

- Username 
- Password
- Email

## Log In
<https://server.de/login>  
Im Login kann sich ein Nutzer auf der Seite anmelden. Dafür muss zuvor eine erfolgreiche Registrierung vollzogen werden. 

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


Aufbau Aufgabenblatt in JSON Datei:

Siehe Aufbau Aufgabenblatt!  
Das Verlinken von Aufgaben mit Aufagebnblättern geschieht mit der _id. (Beim Import wird diese ID intern geändert.) 



Es können sowohl Aufgaben als auch Aufgabenblätter exportiert werden.

Beim Export einer Aufgabe wird nur die Aufgabe exportiert.
Beim Export eines Aufgabenblatt werden sowohl die Aufgaben in dem Aufgabenblatt als auch das Aufgabenblatt selbst exportiert.


Erstellen, Bearbeiten und Löschen von Aufgaben und Aufgabenblätter:

Aufgaben:

Jede Aufgabe enthält standart Daten die immer gleich sind, diese wären:

- Titel
- Description
- Type (wird automatisch bei der Auswahl erstellt)
- Creator (Wird automatisch beim erstellen gesetzt)
- Tags
- PluginCode
- (DataForPlugin) Teilweise werden diese Daten im entsprechenden Plugin gesetzt, der andere Teil in der allgemeinen Erstellung/Bearbeitung.

Des Weiteren enthält jede Aufgabe Plugin spezifische Daten.

Plugin spezifische Daten:

- DataForPlugin
- OpenTests
- ClosedTests

Coding Plugin:

Bei dem Coding Plugin wird in dataForPlugin zum einen der Methodenrahmen angelgt (function xxx (a,b){}).
Zum Anderen müssen die Inputparameter der Methode angegeben werden (a,b).
In OpenTets werden die Werte für die Eingabe und die Werte für die Erwartete Ausgabe der Methode angegeben.
In ClosedTests werden die Werte für die Eingabe und die Werte für die Erwartete Ausgabe der Methode angegeben.


Aufgabenblätter:

- Titel
- Description
- Type (wird automatisch bei der Auswahl erstellt)
- Creator (wird automatisch beim Erstellen gesetzt)
- Course 
- Tasks (Aufgabe kann aus einer Liste von Aufgaben, per Dropdown, hinzugefügt werden )
    - Weighting
    - _id (Ist in der ausgewählten Aufgabe enthalten)
    - Taskname (Ist in der ausgewählten Aufgabe enthalten)


Task Interface:

- (titel: String) Titel der Aufgabe
- (_id: String) wird beim erstellen einer Aufgabe automatisch erstellt. 
- (description: String) Beschreibung der Aufgabe
- (type: String) Typ der Exercise in disem fall "Task"
- (creator: String) Name des Benutzers welcher die Task erstellt. 
- (tags: String[]) Suchtags für die später Aufgabensuche
- (course: String) Fach für das die Task erstellt wird
- (pluginCode: String) Art des Plugin in dem die Task erstellt wird
- (dataForPlugin: {}) Alle möglichen Daten und Informationen die die Task für das entsprechende Plugin benötigt
- (openTests: any[]) Enthält die offenen Tests für die Aufgabe. Diese werden dem Benutzer später zur Überprüfung seiner Eingabe bereit gestellt
- (closedTests: any[]) Enthält die verdeckten Tests für die Aufgabe. Diese wärden dem Benutzer nicht angezeigt sondern bilden die Grundlage für die Bewertung der Aufgabe.  

TaskCollection Interface: 

- (titel: String) Titel des Aufgabenblatts
- (_id: String) wird beim erstellen eine Aufgabenblatts automatisch erstellt. 
- (description: String) Beschreibung des Aufgabenblatts
- (type: String) Typ der Exercise in disem fall "TaskCollection"
- (creator: String) Name des Benutzers welcher das Aufgabenblatt erstellt. 
- (tags: String[]) Suchtags für die später Aufgabenblattsuche
- (course: String) Fach für das das Aufgabenblatt erstellt wird
- (tasks: speziellesTaskObjekt{
    (_id: String) Id der entsprechenden Aufgabe
    (weighting: number) Gewischtung der Aufgabe bzw. Punkte die die Aufgabe brint.
    (taskName: String) Name der entsprechenden Task
}) Die Einzelnen Aufgaben können je nach Plugin flexibel in ein Aufgabenblatt hinzugefügt werden. 





## Solving Exercises

In SolveFullScreen können einzelne Aufgaben sowie ganze Aufgabenblätter gelöst werden. 
Dazu wird in Moodle die entsprechende Aufgabe/Aufgabenblatt mit seiner Id freigegeben. 
Daraufhin wird der User auf SolveFullScreen weitergeleitet wo er nur die Aufgabe bzw. das Aufgabenblatt sieht und lösen kann.

Der User kann die entsprechende Aufgabe lösen, testen und abgeben.

Beim Testen wird die Eingabe des Users mit den offenen Tests verglichen und ausgewärtet. Der User bekommt anschließend eine Rückmeldung bezüglich der Richtigkit seiner Eingabe.

Beim Abgeben wird die Eingabe des Users mit den verdeckten Tests verglichen und ausgewärtet. Anschließend wird das Ergebnis an Moodel übertragen und die Bewertung eingetragen. Der User kann die Aufgabe danach nicht ein weiteres mal abgeben.

## User Management

Auf das User Management können nur User mit der Berechtigung Administrator zugreifen. Dieses Tool dient für die Erstellung, Bearbeitung und Löschung von externen Usern die nicht über Moodle auf die Platform zugreifen.

User Interface:

- (_id: String) Id des Users, wird bei der Erstellung erzeugt.
- (username: String) Benutzername des Users
- (password: String) Passwort des Users
- (email: String) Emailadresse des Users
- (role: String) Berechtigungsgruppe des Users
    - Admin: kann alles außer andere Admins bearbeiten/löschen
    - Dozent: kann alles was mit  Aufgaben und Aufgabenblätter zu tun hat. Diese auch selber lösen.
    - Student: kann nur Aufgaben und Aufgabenblätter lösen.

## Sonstiges

Login: 

Möglichkeit um sich auf die Plattform einzuloggen, anstatt über Moodle.

Register:

Möglichkeit sich einen Account auf der Plattform zu erstellen. 
Standartmäßig Student. Erhöhte Berechtigungen müssen separat gesetzt werden.


## Architektur der Anwendung 
Die Anwendung ist mit einem Router aufgebaut. Die Haupteinstiegspunkte sind:
- Home <https://server.de/>   
    Hier befindet sich die Oberfläche, für eine Benutzung ohne Moodle. Hier kann über die HomeNavBar zwischen ExerciseManagement (Aufgaben anlegen), ExerciseSolve (Aufgaben lösen) und User Management gewechselt werden.  
    ExerciseManagement und Solve haben ihren Haupteistiegspunkt in Overview.vue. Auf der linken Seite des Sliders befindet sich die Auswahl der Aufgaben und auf der rechten Seite das Anlegen/Lösen der Aufgaben.  
    Das Anlegen von Aufgaben teilt sich in zwei Teile auf: Pluginspezifisch und Pluginunspezifisch.  
    Ein Plugin wird im SelectPluginDropdown ausgewählt. Die dortige Eingabe wird im Store gespeichert. Die Komponente ShowPlugin liest das wieder aus dem Store aus und lädt das jeweilige Plugin zur Laufzeit. Dem ShowPlugin muss das gesamte TaskObjekt mitgegeben werden, damit dies dem Plugin übergeben werden kann. Wird innerhalb des Plugins eine Änderung an dem Task vorgenommen, wird ein 'pluginChangedData' Event emittet um die Änderung hoch in das ManageTask.vue zu geben.
- SolveFullScreen <https://server.de/solveFullScreen>  
    Hier befindet sich die Oberfläche, für eine Benutzung mit Moodle. Hier können einzelne Aufgaben oder ganze Aufgabenblätter, die über Moodle bereitgestellt wurden, bearbeitet werden.
    Wenn ein Aufgabenblatt ausgewählt ist, wird eine Ansicht mit einem Slider angezeigt. Auf der linken Seite des Sliders befindet sich das Aufgabenblatt mit seinen Aufgaben und einem Button zum Abgeben des Aufgabenblattes. (Bei Abgabe eines Aufgabenblattes werden alle darin enthaltenen Aufgaben abgegeben, auch die die nicht bearbeitet wurden.)
    Auf der rechten Seite des Sliders befindet sich die Aufgabe mit Übersicht über das Aufgabenblatt. 
    Wenn von Moodel nur eine Aufgabe angegeben wurde gibt es nur die Ansicht einer Aufgabe.  

Konstante Werte, auf die global zugegriffen wird, aber dennoch leicht konfigurierbar sein sollen, sind in der config.json gespiechert. Dort befinden sich zum Einen der Pfad zu dem PluginsOrdner in dem die Plugins abgelegt werden sollen. Zum Anderen befinden sich dort die Verbindungsdaten zum Backend.  
Ist man noch am lokalen entwickeln und möchte Backend-unabhängig testen, empfiehlt es sich die Umgebungsvarible VUE_APP_BACKEND_ONLINE im .env auf false zu setzen. Soll nun eine Backendrequest gemacht werden, so wird diese nicht wie normal an die helper/requests.js Datei geleitet, sondern an Testdaten in der helper/DummyRequests.js Datei.

Anmerkung:  
Es ist bereits beim Import vorgesehen mehrere Dateien gleichzeitig hochzuladen. Da es derzeit noch einen Bug in Primevue im Import Feld gibt (Pull Request pending) ist diese Funktion deaktiviert und man kann nur eine Datei auswählen. Die Funktionalität für mehrere Dateien gleichzeitig ist bereits vorhanden wodurch die Funktionalität bei Bugfix schnell eingebaut werden kann.
