import React from 'react'
import { Example } from '../../components'
import { ReuseRefInput } from './reuseRefInput'

// eslint-disable-next-line import/no-webpack-loader-syntax
import ReuseRefInputTxt from '!!raw-loader!./reuseRefInput.js'

const description = (
  <p>
    There may be times, when styles need to change for multiple states. To allow this, pass in the ref and style object returned from one hook, into another. Use the options argument for the ref.
  </p>
)

export const ReuseRefExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'Reuse Hook Ref' }
  component={ <ReuseRefInput title={ 'Reuse Hook Ref Input' } />}
  codeText={ ReuseRefInputTxt }
/>)
