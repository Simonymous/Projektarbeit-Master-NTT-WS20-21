export default class moodleSessions {
    private static instance: moodleSessions;
    private sessions : Map<string,any> //key, session

    private constructor (){
        this.sessions = new Map<string,any>(); //key, session
    }

    public static getInstance():moodleSessions {
        if(!moodleSessions.instance) {
            moodleSessions.instance = new moodleSessions();
        }

        return moodleSessions.instance;
    }

    public addSession(key : string, session : any) {
            this.sessions.set(key,session)
    }

    public removeSession(key : string) {
        this.sessions.delete(key)
    }

    public checkSession(key : string) {
        return this.sessions.get(key)
    }
}