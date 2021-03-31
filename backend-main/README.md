# Dev Doku


## Project setup
```
npm install
```
Configurate Backend in /src/config.json
```
    "port":3000,
    "enableCors":true,
    "mongodb_path":"mongodb://root:example@mongo:27017/test?authSource=admin",
    "moodle_consumer_key":"top",
    "moodle_consumer_secret":"secret"
```
If you run backend and frontend on the same machine/same container, make sure to set "enableCors" to true
mongodb_path is the exakt path to the mongo db.
moodle_consumer_key and moodle_consumer_secret are defined in the moodle settings for the lti tool.
also make sure that you define a task or task colelction id in the tool definitions:
```
taskId=XXXTASKIDXXX
```
This Task ID is displayed in the frontend
### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### See a technical documentation as html
if nothing else is running on port 8080, run
```
npx @compodoc/compodoc -s
```
and access it at localhost:8080

## Plugins erstellen
1. plugin erstellen  
Hierfür wird innerhalb des /src/plugin Ordners ein eigener Ordner angelegt, der als Bereich für das Plugins gilt.
Es können beliebig viele Dateien angelegt werden. Wichtig ist, dass eine "Hauptdatei" existiert, welche die Methoden
```
getOpenTests(data:any,tests:any,input:any):any
```
und
```
submit(data:any,tests:any,input:any):number
```
implementieren und exportieren.
getOpenTests:  
**data:** Intern das DataForPlugin Attribut (siehe oben), welches als Platzhalter für alle Plugin-spezifischen Daten gilt  
**tests:** Open Tests, die zuvor im Frontend erstellt wurden  
**input:** Nutzer Input, welches vom Frontend Plugin versendet wird  
**get Open Tests** soll nun die offenen Tests überprüfen und anschließend Feedback ans Frontend senden. Die Funktionsweise der Überprüfung
sowie das Format ist dabei komplett dem Entwickler überlassen, es muss lediglich sichergestellt werden, dass das Frontend entsprechend mit den Ergebnissen der Open Tests arbeiten kann.  
**submit** bekommt die selben Argumente übergeben, hier sind tests allerdings nicht die Open Tests sondern die im Frontend definierten Closed Tests.
In der Logik dieser Methode sollen nun die Closed Tests überprüft werden und daraus eine Note im Bereich **0-100** errechnen und zurück geben.


Ein Beispiel für ein Plugin ist im /plugins Ordner unter "basicExamplePlugin" vorhanden, ein weiteres bereits implementiertes Plugin unter "codingPlugin".

2. plugin in plugins.json registrieren  
Hierfür wird im Array ein eigener Eintrag erzeugt, der folgendermaßen aufgebaut ist:
```
{
    "name":"PLUGINNAME",
    "directory":"/ORDNER_DES_PLUGINS",
    "mainFile":"MAIN_FILE_MIT_EXPORTIEREN_METHODEN"
}
```
der Name muss sich zwingend mit dem im Frontend definierten Namen decken!
# Wichtige Routen im Überblick
## Authentifikation

```POST /auth/moodleLogin```
wird vom Moodle LTI System verwendet.
Es wird automatisiert zur der in moodle angegebenen Aufgabe / Aufgabenblatt weitergeleitet - bzw. zu einer entsprechenden Ansicht, falls die Aufgabe vom Nutzer bereits abgegeben wurde.

```POST /auth/login``` erwartet ein UserDTO im Body und loggt den entsprechenden Nutzer ein. wichtig hierbei sind eigentlich nur id, username, email und password
```
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string
```
liefert den Status und falls erfolgreich eingeloggt wurde ein Token, welches im Folgenden für die Authentikation verwendet wird

```POST /auth/register``` erwartet ein UserDTO im Body und legt den entsprechenden Nutzer an
```
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string
```

## Standardmethoden für Tasks und TaskCollections

```POST /task/create```
Erstellt einen Task. Hierfür wird eine TaskDTO im Body erwartet, die folgendermaßen aufgebaut ist:
```
    title: string,
    description: string,
    content: string,
    creator: string,
    type: string,
    tags: [],
    course: string,
    pluginCode: string,
    dataForPlugin: any,
    closedTests: [],
    openTests: [],
```
DataForPlugin spielt dabei eine wichtige Rolle, da es ein generisches Attribut für alle Plugin Daten ist, die ein Entwickler verwenden kann.
So ist es möglich, Plugins zu entwickeln, ohne diese Struktur aufzubrechen.

```POST /taskcollection/create```
Erstellt einen TaskCollection. Hierfür wird eine TaskCollectionDTO im Body erwartet, die folgendermaßen aufgebaut ist:
```
    title: string,
    description: string,
    type:string,
    creator: string,
    tags: [],
    course: string,
    tasks: TaskInCollection[]
```
, wobei sich TaskInCollection folgendermaßen zusammensetzt:
```
interface TaskInCollection {
  _id: string,
  weighting: number,
  taskName: string
}
```

ein GET auf /task oder /taskcollections liefert alle tasks/collections als Array
analog hierzu gibt ein GET auf /task bzw. /taskcollection mit :id als URL Param ein spezifischer Task bzw eine spezifische TaskCollection zurück, falls vorhanden.
Andernfalls wird entsprechend ein HTTP 404 (NOT FOUND) zurückgeliefert
Nach dem selben prinzip löscht die DELETE Methode auf /task bzw. /taskcollection mit :id als URL Param einen spezifischer Task bzw eine spezifische TaskCollection

```GET /getTaskCollections/:id```
Liefert alle Task Collections, die einen spezifischen Task (der per ID via Parameter angegeben wurde) verwenden
Dies wird verwendet, wenn ein Task gelöscht werden soll, der allerdings noch in TaskCollections verwendet wird.

```PUT /task/update``` bzw. ```PUT /taskcollection/update```
updatet einen Task bzw. eine TaskCollection. eine taskDTO bzw taskcollectionDTO analog zur create Methode wird dabei erwartet.

## Open Tests und Submissions für Tasks
```POST /task/test/:id``` mit dem Nutzer input im Body (Object)
Liefert die Ergebnisse für alle im Task definierten Open Tests für den per ID angegebenen Task. Es werden intern alle definierten Tests ausgeführt und nach Plugin Definition zurück ans Frontend geliefert

```POST /task/submit/:id``` mit dem Nutzer
führt analog zu den Open Tests die Closed Tests aus und berechnet auf Basis des prozentualen bestanden. Hierbei ist wichtig, dass im Header unter authorization das Nutzer Token vorhanden ist, welches zu Beginn der moodleLogin Session (siehe Oben) generiert und ans Frontend gesendet wurde. Dieses wird verwendet, um die berechnete Note einem Nutzer zuordnen zu können.

## Open Tests und Submissions für TaskCollections
```POST /taskcollection/submitTask/:taskcollectionID/:taskID```
Gibt innerhalb einer TaskCollection einen Task ab. Bei dem agegebenen Task werden die Closed Tests durchlaufen und die Bewertung des seperaten Tasks zwischengespeichert, bis zu einem späteren Zeitpunkt das gesamte Aufgabenblatt submitted wird
Auch hier ist der Authorization Header erforderlich, um den Nutzer zu authentifizieren

```POST /taskcollection/submit/:id```
Submitted die gesamte TaskCollection. Hierbei ist es notwendig,
dass vorher die einzelnen Tasks innerhalb der TaskCollection submitted wurden. Wurde ein Task nicht submitted, wird er entsprechend als 0% gelöst bewertet.
Innerhalb der Abgabe werden alle im vorherigen Schritt abgegebenen Tasks entsprechend ihrer definierten Wichtung miteinander verrechnet, woraus sich dann eine Gesamtnote für die Collection ergibt, welche dann wiederum an Moodle übertragen wird.
