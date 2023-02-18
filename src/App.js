import { useState } from 'react'
import Table from "./components/Table";
import TableForm from "./components/TableForm";

function App() {
  const [showInvoice, setShowInvoice] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [code, setCode] = useState("")
  const [gstin, setGstin] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [clientState, setClientState] = useState("")
  const [clientCode, setClientCode] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState("")
  const [sgst, setSgst] = useState("")
  const [description, setDescription] = useState("")
  const [hsn, setHsn] = useState("")
  const [quantity, setQuantity] = useState("")
  const [per, setPer] = useState("")
  const [rate, setRate] = useState("")
  const [amount, setAmount] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [itemTotal, setItemTotal] = useState(0)
  const [taxTotal, setTaxTotal] = useState(0)
  const [list, setList] = useState([])
  const [sn, setSn] = useState(1)
  const [details, setDetails] = useState()
  var [sgstValue,setSgstValue] = useState({})
  var [sgstList,setSgstList] = useState([])

  const currency = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const detailsValue = () => {
    const newDetails = {
      name,
      address,
      state,
      code,
      gstin,
      clientName,
      clientAddress,
      clientState,
      clientCode,
      invoiceNumber,
      invoiceDate,
      sgst
    }
    setDetails(newDetails)
  }
  const updateSgstList = (sgstValue)=>{
    Object.entries(sgstValue).forEach(([key, value]) => {
        sgstList.push(value)
    });  
}
  return (
    <>
      <main className="p-5 md:max-w-xl md:mx-auto xl:max-w-4xl xl:max-w-4xl bg-white rounded shadow">

        {showInvoice ? (<>
          <div >
            <Table details={details} list={list} total={total} currency={currency} sgstList={sgstList} taxTotal={taxTotal} setTaxTotal={setTaxTotal} totalAmount={totalAmount} itemTotal={itemTotal} per={per}/>
            <button className='mt-5 text-white font-bold bg-blue-500 py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'
              onClick={() => {setShowInvoice(false);setSgstValue({})}}
            >Edit Information</button>
          </div>
        </>) :
          (<>
            <div className='flex flex-col justify-center'>
                <TableForm  name ={name} setName = {setName} address = {address} setAddress ={setAddress} state ={state} setState ={setState} code ={code} setCode ={setCode} gstin ={gstin} setGstin ={setGstin} clientName ={clientName} setClientName ={setClientName} clientAddress ={clientAddress} setClientAddress ={setClientAddress} clientState ={clientState} setClientState ={setClientState} clientCode ={clientCode} setClientCode ={setClientCode} invoiceNumber ={invoiceNumber} setInvoiceNumber ={setInvoiceNumber} invoiceDate ={invoiceDate} setInvoiceDate={setInvoiceDate} setDescription={setDescription} description={description} hsn={hsn} setHsn={setHsn} quantity={quantity} setQuantity={setQuantity} amount={amount} setAmount={setAmount} rate={rate} setRate={setRate} setList={setList} list={list} total={total} setTotal={setTotal} per={per} setPer={setPer} sn={sn} setSn={setSn} sgst={sgst} setSgst={setSgst} currency={currency} sgstValue={sgstValue} setSgstValue={setSgstValue} itemTotal={itemTotal} setItemTotal={setItemTotal} taxTotal={taxTotal} setTaxTotal={setTaxTotal} sgstList={sgstList} setSgstLis={setSgstList} setTotalAmount={totalAmount}/>
              <button className='mt-5 text-white font-bold bg-blue-500 py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'
                onClick={() => {setShowInvoice(true); detailsValue();updateSgstList(sgstValue);setTotalAmount(Math.round(taxTotal*2+total*1))}}
              >Preview Invoice</button>
            </div>
          </>)
        }
      </main>
    </>
  );
}

export default App;
