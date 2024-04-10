import React, {useState} from 'react'
import StorePerformance from './StorePerformance'

const StorePurchases = ({store}) => {
  const [showTable, setShowTable] = useState(false)

  return (
    <div>
      <button style={{"width":"50%"}} onClick={()=>setShowTable(!showTable)}>
        {store.store_name}
      </button>
      <br/>
      {showTable ? <StorePerformance store={store}/> : null }
      <br />
    </div>
  )
}

export default StorePurchases
