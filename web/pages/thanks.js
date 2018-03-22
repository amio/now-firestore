import React from 'react'
import Layout from '../components/layout.js'
import api from '../libs/api.js'

// import topicWrappers from '../assets/topicWrappers.js'

export default class Index extends React.Component {
  static async getInitialProps ({ query }) {
    return query
  }

  state = {}

  async componentDidMount () {
    const { id } = this.props
    const { topic, form } = await api.get(`/signup/${id}`).then(
      res => res.data,
      err => console.error(err) || {}
    )

    this.setState({topic, form})
  }

  render () {
    const { id } = this.props

    return (
      <Layout>
        <div className='thanks'>
          <h1>谢谢参加</h1>
          <i>{id}</i>
        </div>
        <style jsx>{`
          .thanks {
            padding-top: 30%;
            text-align: center;
            margin: 0 auto;
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
