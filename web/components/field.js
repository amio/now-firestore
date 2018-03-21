import { Component } from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'

export default function FieldSwitcher (props) {
  const { type } = props
  const Field = {
    'text': TextField,
    'number': TextField
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
  onChange = (e) => {
    const { onChange } = this.props
    onChange && onChange({
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
    const { label, field, type, value, error } = this.props
    const InputProps = { type, value, error, onChange }
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor={field}>{label}</InputLabel>
        <Input id={field} {...InputProps} fullWidth />
        { this.validation() }
      </FormControl>
    )
  }
}
