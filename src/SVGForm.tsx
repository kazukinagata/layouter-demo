import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import { SVGForm } from '@koishidev/layouter-client-helper'

type Props = {
  fields: SVGForm,
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}
export default function SVGFormFields({fields, onChange}: Props) {
  const fieldArr = Object.keys(fields).map((key) => fields[key])
  return (
    <>
      {fieldArr.map((field) => (
        <FormControl fullWidth margin='normal' key={field.id}>
          <TextField name={field.id} label={field.label} value={field.value} onChange={onChange} multiline={field.tag === 'textArea'} />
        </FormControl>
      ))}
    </>
  )
}
