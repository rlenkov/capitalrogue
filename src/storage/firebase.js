const path = require(`path`)
const fs = require('fs')
const firebase = require('firebase/app')
require('firebase/auth')
const { Storage } = require('@google-cloud/storage')
require('dotenv').config()

exports.initFirebase = () => {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    }

    firebase.initializeApp(firebaseConfig)
}

const downloadFile = async (bucketName, storage, srcFilename, destFilename) => {
    const options = {
        destination: destFilename,
    }
    await storage.bucket(bucketName).file(srcFilename).download(options)
    console.info(
        `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`,
    )
}

exports.getAllFiles = async prefix => {
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET

    const storage = new Storage()

    async function getFiles(prefix) {
        const [files] = await storage.bucket(bucketName).getFiles()

        const promises = files.map(file => {
            if (file.metadata.size !== '0' && file.name.startsWith(prefix)) {
                const postPath = path.resolve(
                    __dirname,
                    `../../content/blog/`,
                    file.name.replace(`${prefix}/`, ''),
                )
                const nestedDirs = path.dirname(postPath)
                if (!fs.existsSync(nestedDirs)) {
                    fs.mkdirSync(nestedDirs, { recursive: true })
                }
                return downloadFile(
                    bucketName,
                    storage,
                    file.name,
                    postPath,
                ).catch(console.error)
            }
        })

        await Promise.all(promises)
    }

    await getFiles(prefix).catch(console.error)
}
