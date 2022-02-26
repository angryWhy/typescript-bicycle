import React, { memo } from 'react'
interface SetUserProps {
  getCompilerData:(value: any) => void,
  visible:boolean,
  setShow:Function
}
const SetUser :React.FC<SetUserProps> = memo(({getCompilerData,visible,setShow}) => {
  return (
    <div>SetUser</div>
  )
})

export default SetUser