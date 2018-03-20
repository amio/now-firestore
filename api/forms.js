const { send, json } = require('micro')
const firestore = require('./libs/firestore.js')

const list = async function (req, res) {
  const { fid } = req.params
  const snapshot = await firestore.collection('signups')
    .where('topic', '==', fid)
    .get()

  const results = snapshot.docs.map(s => {
    return s.data()
  })

  send(res, 200, results)
}

const signup = async function (req, res) {
  const { topic, data } = await json(req)

  await firestore.collection('signups').add({
    topic,
    data,
    createAt: Date.now()
  })

  send(res, 200)
}

module.exports = {
  list,
  signup
}
