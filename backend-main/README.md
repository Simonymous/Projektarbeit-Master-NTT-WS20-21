# Dev Doku


## Project setup
```
npm install
```

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

## Architektur

# Wichtigste Routen im Überblick
## Authentifikation

POST /auth/moodleLogin
wird vom Moodle LTI System verwendet.
Es wird automatisiert zur der in moodle angegebenen Aufgabe / Aufgabenblatt weitergeleitet - bzw. zu einer entsprechenden Ansicht, falls die Aufgabe vom Nutzer bereits abgegeben wurde.

POST /auth/login erwartet ein UserDTO im Body und loggt den entsprechenden Nutzer ein. wichtig hierbei sind eigentlich nur id, username, email und password
```
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string
```
liefert den Status und falls erfolgreich eingeloggt wurde ein Token, welches im Folgenden für die Authentikation verwendet wird

POST /auth/register erwartet ein UserDTO im Body und legt den entsprechenden Nutzer an
```
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string
```

## Standardmethoden für Tasks und TaskCollections

POST /task/create
Erstellt einen Task Hierfür wird eine TaskDTO im Body erwartet, die folgendermaßen aufgebaut ist:
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

POST /taskcollection/create
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

GET /getTaskCollections/:id
Liefert alle Task Collections, die einen spezifischen Task (der per ID via Parameter angegeben wurde) verwenden
Dies wird verwendet, wenn ein Task gelöscht werden soll, der allerdings noch in TaskCollections verwendet wird.

PUT /task/update bzw. PUT /taskcollection/update
updatet einen Task bzw. eine TaskCollection. eine taskDTO bzw taskcollectionDTO analog zur create Methode wird dabei erwartet.

## Open Tests und Submissions für Tasks

## Open Tests und Submissions für TaskCollections