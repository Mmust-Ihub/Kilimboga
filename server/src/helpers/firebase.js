import admin from "firebase-admin"
import config from "../config/config.js"

admin.initializeApp({
    credential: admin.credential.cert(config.firebase.cfg)
})

const db = admin.firestore()

export default db