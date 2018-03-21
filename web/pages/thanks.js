import React from 'react'
import Layout from '../components/layout.js'
import api from '../libs/api.js'

// import topicWrappers from '../assets/topicWrappers.js'

export default class Index extends React.Component {
  static async getInitialProps ({ query, req }) {
    const { id } = query
    const { topic, form } = await api.get(`/signup/${id}`, {
      baseURL: req ? 'http://localhost:3000/api' : '/api'
    }).then(
      res => res.data,
      err => console.error(err) || {}
    )

    return { id, form, topic }
  }

  state = {
  }

  render () {
    const { id, topic, form } = this.props
    console.log(form)
    if (!topic) return '404'

    return (
      <Layout>
        <div className='banner'>
          <h1>谢谢参加</h1>
          <i>{id}</i>
        </div>
        <style jsx>{`
          .banner {
            text-align: center;
            margin: 2rem 1rem;
          }
          h1 {
            font-size: 2rem;
            font-weight: 200;
            line-height: 4rem;
          }
          i {
            color: #DDD;
            font-size: 12px;
          }
        `}</style>
      </Layout>
    )
  }
}
