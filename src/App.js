import { useState } from 'react'
import Table from "./components/Table";
import TableForm from "./components/TableForm";

function App() {
  const [showInvoice, setShowInvoice] = useState(false)
  const [name, setName] = useState("Himanshu Verma")
  const [address, setAddress] = useState("Chhjmanpura")
  const [state, setState] = useState("")
  const [code, setCode] = useState("")
  const [gstin, setGstin] = useState("")
  const [clientName, setClientName] = useState("Hrithik")
  const [clientAddress, setClientAddress] = useState("Jhansi")
  const [clientState, setClientState] = useState("")
  const [clientCode, setClientCode] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("123234234")
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
              <article className='md:grid grid-cols-2 gap-5'>
                <div className='flex flex-col'>
                  <label htmlFor="name">Enter your name</label>
                  <input type="text" name="name" id="text" placeholder="Enter Name" autoComplete='off'
                    value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="address">Enter your address</label>
                  <input type="text" name="address" id="address" placeholder="Enter Address" autoComplete='off' value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </article>
              <article className='md:grid grid-cols-3 gap-5'>
                <div className='flex flex-col'>
                  <label htmlFor="gstin">Enter GSTIN</label>
                  <input type="text" name="gstin" id="gstin" placeholder="Enter gstin number" autoComplete='off' value={gstin} onChange={(e) => setGstin(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="state">Enter your state</label>
                  <input type="text" name="state" id="state" placeholder="Enter State" autoComplete='off' value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="code">Enter Code</label>
                  <input type="number" name="code" id="code" placeholder="Enter code number" autoComplete='off' value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
              </article>
              <article className='md:grid grid-cols-3 gap-5 md:mt-10'>
                <div className='flex flex-col'>
                  <label htmlFor="clientName">Enter client name</label>
                  <input type="text" name="clientName" id="clientName" placeholder="Enter name" autoComplete='off' value={clientName} onChange={(e) => setClientName(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="clientAddress">Enter client address</label>
                  <input type="text" name="clientAddress" id="clientAddress" placeholder="Enter Client Address" autoComplete='off' value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="clientState">Enter client state</label>
                  <input type="text" name="clientState" id="clientState" placeholder="Enter State" autoComplete='off' value={clientState} onChange={(e) => setClientState(e.target.value)} />
                </div>
              </article>
              <article className='md:grid grid-cols-3 gap-5'>
                <div className='flex flex-col'>
                  <label htmlFor="clientCode">Enter Client Code</label>
                  <input type="number" name="clientCode" id="clientCode" placeholder="Enter code number" autoComplete='off' value={clientCode} onChange={(e) => setClientCode(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="number" name="invoiceNumber" id="invoiceNumber" placeholder="Enter Invoice number" autoComplete='off' value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input type="date" name="invoiceDate" id="invoiceDate" autoComplete='off' value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                </div>
              </article>
              <article>
                <TableForm setDescription={setDescription} description={description} hsn={hsn} setHsn={setHsn} quantity={quantity} setQuantity={setQuantity} amount={amount} setAmount={setAmount} rate={rate} setRate={setRate} setList={setList} list={list} total={total} setTotal={setTotal} per={per} setPer={setPer} sn={sn} setSn={setSn} sgst={sgst} setSgst={setSgst} currency={currency} sgstValue={sgstValue} setSgstValue={setSgstValue} itemTotal={itemTotal} setItemTotal={setItemTotal} taxTotal={taxTotal} setTaxTotal={setTaxTotal} sgstList={sgstList} setSgstLis={setSgstList} setTotalAmount={totalAmount}/>
              </article>
              

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
