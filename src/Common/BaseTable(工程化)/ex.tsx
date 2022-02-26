import React, { memo } from 'react'

const ex = memo(() => {
  return (
    <div>ex</div>
  )
})

export default ex

const obj = {
    1:2,
    2:"3"
}
type a =typeof obj
type b =a