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

/auth/moodleLogin
wird vom Moodle LTI System verwendet.
Es wird automatisiert zur der in moodle angegebenen Aufgabe / Aufgabenblatt weitergeleitet - bzw. zu einer entsprechenden Ansicht, falls die Aufgabe vom Nutzer bereits abgegeben wurde.

/auth/login erwartet ein UserDTO im Body und loggt den entsprechenden Nutzer ein. wichtig hierbei sind eigentlich nur id, username, email und password
```
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string
```
liefert den Status und falls erfolgreich eingeloggt wurde ein Token, welches im Folgenden für die Authentikation verwendet wird

/auth/register erwartet ein UserDTO im Body und legt den entsprechenden Nutzer an
```
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string
```

## Tasks und TaskCollections
