import React from 'react'
import Layout from '../components/layout.js'
import api from '../libs/api.js'

import topics from '../assets/topics.json'

export default class Index extends React.Component {
  static async getInitialProps ({ query }) {
    const { topic } = query
    const { signups, error } = await api.get(`/forms/${topic}`).then(
      res => ({signups: res.data}),
      err => ({error: err.toString()})
    )
    return {
      topic,
      fields: topic && topics[topic],
      signups,
      error
    }
  }

  render () {
    const { topic, fields, signups, error } = this.props

    if (!fields) return '404'
    if (error) return error

    return (
      <Layout>
        <div className='wrapper'>
          <div className='banner'>
            报名记录
            <i>[{topic}]</i>
          </div>
          <table cellPadding='11' cellSpacing='0'>
            <TableHead fields={fields} />
            <tbody>
              { signups.map(s => (
                <TableRow {...s.form} fields={fields} key={s.createAt} />
              )) }
            </tbody>
          </table>
        </div>
        <style jsx>{`
          .wrapper {
            padding: 1rem;
          }
          .banner {
            font-size: 2rem;
            line-height: 1.2em;
            text-align: center;
            margin: 2rem 1rem;
          }
          i {
            display: block;
            font-size: 1rem;
            color: #777;
          }
          table {
            margin: 1rem auto;
          }
        `}</style>
      </Layout>
    )
  }
}

const TableRow = (props) => {
  const { fields, ...data } = props
  return (
    <tr>
      { fields.map(f => <td key={f.field}>{data[f.field]}</td>) }
      <style jsx>{`
        td {
          color: #333;
          min-width: 70px;
          border-bottom: 1px solid #DDD;
        }
      `}</style>
    </tr>
  )
}

const TableHead = ({fields}) => {
  return (
    <thead>
      <tr>
        { fields.map(f => <th key={f.field}>{f.label}</th>) }
      </tr>
      <style>{`
        th {
          background-color: #DDD;
        }
        th {
          text-align: left;
        }
      `}</style>
    </thead>
  )
}
