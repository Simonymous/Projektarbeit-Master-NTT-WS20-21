/**
 *
 * Singleton Construct to store moodle Sessions from a User
 * Sessions a stored in a Map<SESSIONKEY,SESSION>
 *
 */

export default class moodleSessions {
    private static instance: moodleSessions;
    private sessions : Map<string,any> //key, session

    private constructor (){
        this.sessions = new Map<string,any>(); //key, session
    }

    /**
     *
     * @returns the Instance of the moodle Session managment system
     */
    public static getInstance():moodleSessions {
        if(!moodleSessions.instance) {
            moodleSessions.instance = new moodleSessions();
        }

        return moodleSessions.instance;
    }

    /**
     *
     * Adds a Session to the session manager
     *
     * @param key Session Key (Json Token created by auth) to access session
     * @param session Moodle Session (Obj from lti)
     */
    public addSession(key : string, session : any) {
        this.sessions.set(key,session)
    }

    /**
     * Removes a session for the given key
     *
     * @param key key to access session to remove
     */
    public removeSession(key : string) {
        this.sessions.delete(key)
    }

    /**
     *
     * Gets A Session from the session Manager
     *
     * @param key Key to access session to get
     * @returns Session (Lti Format )
     */
    public getSession(key : string) {
        return this.sessions.get(key)
    }
}