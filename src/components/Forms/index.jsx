import React from 'react'

const preset_txt = {
  className: 'form-control-input',
  type: 'text',
  required: true
}

const preset_txt_full = {
  className: 'form-control-input-full',
  type: 'text'
  // required: true
}

const preset_float = {
  className: 'form-control-input',
  type: 'number',
  step: '0.01',
  required: true
}

export const PurchaseForm = ({ onSubmit }) => {

  // console.log('Purchase Form render');
  let $title, $cost, $category
  return (
    <form className='flex-form'
      onSubmit={e => {
        e.preventDefault()
        onSubmit({
          title: $title.value,
          cost: $cost.value
        })
        $title.value = ''
        $cost.value = ''
        $title.focus()
      }}>

      <div>
        <Input
          label={'Title'}
          attrs={preset_txt}
          $ref={c => $title = c}
        />
        <Input
          label={'Cost'}
          attrs={preset_float}
          $ref={c => $cost = c}
        />
        <AddSubmitBtn />
      </div>
      <div>
        <Input
          label={'Category'}
          attrs={preset_txt_full}
          $ref={c => $category = c}
        />
      </div>

    </form>
  )
}

export const SimpleForm = ({ label, onSubmit }) => {
  let $input
  return (
    <form className='flex-form'
      onSubmit={e => {
        e.preventDefault()
        onSubmit({
          title: $input.value,
        })
        $input.value = ''
      }}>
      <div>
        <Input
          label={label}
          attrs={preset_txt}
          $ref={c => {
            $input = c
            if (c) c.focus()
          }}
        />
        <AddSubmitBtn />
      </div>
    </form>
  )
}

const AddSubmitBtn = () =>
  <span>
    <button className='form-control-add-btn' type="submit">
      +
    </button>
  </span>

const Input = ({label, attrs, $ref}) =>
  <span className='form-control-group'>
    <p>{label}</p>
    <input {...attrs} ref={$ref} />
  </span>
