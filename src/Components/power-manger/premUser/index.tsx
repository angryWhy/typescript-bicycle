import React, { memo } from 'react'
interface PremissionProps {
  getTreeeData:(value: any) => void,
  visible:boolean,
  setShow:Function
}
const Premission :React.FC<PremissionProps> = memo(({getTreeeData,visible,setShow}) => {
  return (
    <div>Premission</div>
  )
})

export default Premission