import { Component } from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import Radio, { RadioGroup } from 'material-ui/Radio'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel
} from 'material-ui/Form'

export default function FieldSwitcher (props) {
  const { type } = props
  const Field = {
    text: TextField,
    number: TextField,
    stage: FundStage
  }[type]
  return (
    <div>
      <Field {...props} />
      <style jsx>{`
        margin: 0.5rem auto;
      `}</style>
    </div>
  )
}

class TextField extends Component {
  onChange = e => {
    const { onChange } = this.props
    onChange &&
      onChange({
        key: this.props.field,
        value: e.target.value
      })
  }

  validation = () => {
    const { validate = () => {} } = this.props
    return <FormHelperText>{validate()}</FormHelperText>
  }

  render () {
    const { onChange } = this
    const { label, field, type, value, error, required } = this.props
    const InputProps = { type, value, error, onChange }
    return (
      <FormControl fullWidth required={required}>
        <InputLabel htmlFor={field}>{label}</InputLabel>
        <Input id={field} {...InputProps} fullWidth />
        {this.validation()}
      </FormControl>
    )
  }
}

class FundStage extends Component {
  onChange = e => {
    const { onChange } = this.props
    onChange &&
      onChange({
        key: this.props.field,
        value: e.target.value
      })
  }

  render () {
    const { onChange } = this
    const { label, field, value, required } = this.props

    return (
      <FormControl fullWidth required={required}>
        <FormLabel style={{ margin: '1rem 0' }}>{label}</FormLabel>
        <RadioGroup value={value} name={field} onChange={onChange}>
          <FormControlLabel value='Angel' control={<Radio />} label='天使轮' />
          <FormControlLabel value='A' control={<Radio />} label='A 轮' />
          <FormControlLabel value='B' control={<Radio />} label='B 轮' />
          <FormControlLabel value='C+' control={<Radio />} label='C 轮以上' />
        </RadioGroup>
      </FormControl>
    )
  }
}
