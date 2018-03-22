const Firestore = require('@google-cloud/firestore')

function getFirebaseConfig () {
  const configFromEnv = process.env.FORMS_FIREBASE_CONFIG
  if (configFromEnv) {
    return JSON.parse(Buffer.from(configFromEnv, 'base64').toString())
  } else {
    return require('../../fb-key.json')
  }
}

/* eslint-disable camelcase */
const { private_key, client_email, project_id } = getFirebaseConfig()
const firestore = new Firestore({
  credentials: { private_key, client_email },
  projectId: project_id
})

module.exports = firestore
