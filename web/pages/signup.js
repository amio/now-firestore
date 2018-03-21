import React from 'react'
import Router from 'next/router'
import Button from 'material-ui/Button'
import Layout from '../components/layout.js'
import Field from '../components/field.js'
import api from '../libs/api.js'

import topics from '../assets/topics.json'
// import topicWrappers from '../assets/topicWrappers.js'

export default class Index extends React.Component {
  static async getInitialProps ({ query }) {
    const { topic } = query
    return {
      fields: topic && topics[topic]
    }
  }

  state = {
    form: {}
  }

  onChange = ({key, value}) => {
    // set form value to `this.state.form`
    this.setState(state => {
      state.form[key] = value
      return state
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { topic } = Router.query
    const { form } = this.state

    api.post('/signup', { topic, form }).then(res => {
      const { id } = res.data
      Router.push({
        pathname: '/thanks',
        query: { id }
      })
    })
  }

  render () {
    const { fields } = this.props
    if (!fields) return '404'

    return (
      <Layout>
        <div className='banner'>
          报名表
        </div>
        <form onSubmit={this.onSubmit}>
          { fields.map(f => (
            <Field key={f.field} {...f} onChange={this.onChange} />
          )) }
          <div className='submit'>
            <Button variant='raised' color='primary' type='submit'>提交</Button>
          </div>
        </form>
        <style jsx>{`
          .banner {
            font-size: 2rem;
            line-height: 4rem;
            text-align: center;
            margin: 2rem 1rem;
          }
          form {
            width: 80vw;
            max-width: 260px;
            margin: 1rem auto;
          }
          .submit {
            text-align: right;
            margin: 2rem 0;
          }
        `}</style>
      </Layout>
    )
  }
}
