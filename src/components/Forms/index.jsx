import React from 'react'
// import PurchaseAutosuggest from '../Forms/PurchaseAutosuggest'
import AutosuggestInput from '../Forms/AutosuggestInput'


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

const formData = {};

const formChange = (data) => {
  Object.assign(formData, data)
  console.log('form data', formData);
}

export const PurchaseForm = ({ categories, onSubmit }) => {

  // console.log('Purchase Form render');
  let $title, $cost, $category
  return (
    <form className='flex-form'
      onSubmit={e => {
        e.preventDefault()
        onSubmit({
          // title: $title.value,
          title: formData.title,
          cost: $cost.value
        })
        $title.value = ''
        $cost.value = ''
        $title.focus()
      }}>

      <div>
        <AutosuggestInput
          onChange={formChange}
          inputList={categories}
          placeholder='Type a purchase title'

        />
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

export const RenameForm = ({ title, onSubmit }) => {
  let $title, $preserve
  return (
    <form onSubmit={e => {
        e.preventDefault()
        let newTitle = $title.value
        if (newTitle !== title) {
          onSubmit({
            title: newTitle,
            preserve: $preserve.checked
          })
        }
      }}>
      <div>
        <Input
          label={'Rename'}
          attrs={preset_txt}
          $ref={c => {
            if (c) {
              c.value = title;
            }
            $title = c
          }}
          value={title}
        />
        <RenameBtn />
      </div>
      <div>
        <label>
          Preserve references
          <input
            ref={c => $preserve = c}
            type='checkbox'/>
        </label>
      </div>
    </form>
  )
}

export const SimpleForm = ({ label, onSubmit }) => {
  let $input
  return (
    <form className='inline-form'
      onSubmit={e => {
        e.preventDefault()
        onSubmit({
          title: $input.value,
        })
        // $input.value = ''
      }}>
        <input className='mr-10'
          placeholder={label}
          type='text'
          required={true}
          ref={c => {
            $input = c
            if (c) c.focus()
          }}
        />
        <button className='form-control-sm-btn' type="submit">
          +
        </button>
    </form>
  )
}

const AddSubmitBtn = () =>
  <span>
    <button className='form-control-sm-btn' type="submit">
      +
    </button>
  </span>

const RenameBtn = () =>
  <span>
    <button className='form-control-btn' type="submit">
      Rename
    </button>
  </span>

const Input = ({label, attrs, $ref}) =>
  <span className='form-control-group'>
    <p>{label}</p>
    <input {...attrs} ref={$ref} />
  </span>
