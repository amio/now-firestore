const { send, json } = require('micro')
const firestore = require('./libs/firestore.js')

// list all registered guest for a topic
const list = async function (req, res) {
  const { topic } = req.params
  const snapshot = await firestore.collection('signups')
    .where('topic', '==', topic)
    .get()

  const results = snapshot.docs.map(s => {
    return s.data()
  })

  send(res, 200, results)
}

// post signup form for a topic
const signup = async function (req, res) {
  const { topic, form } = await json(req)

  const result = await firestore.collection('signups').add({
    form,
    topic,
    createAt: Date.now()
  })

  send(res, 200, {
    id: result.id
  })
}

// get specific registered guest info
const signupInfo = async function (req, res) {
  const { sid } = req.params

  const snapshot = await firestore.collection('signups').doc(sid).get()

  send(res, 200, snapshot.data())
}

module.exports = {
  list,
  signup,
  signupInfo
}
