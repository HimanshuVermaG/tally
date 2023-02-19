import { useState } from 'react'
import Table from "./components/Table";
import TableForm from "./components/TableForm";

function App() {
  const [total, setTotal] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [itemTotal, setItemTotal] = useState(0)
  const [taxTotal, setTaxTotal] = useState(0)
  const [list, setList] = useState([])
  const [details, setDetails] = useState()
  var [sgstValue,setSgstValue] = useState({})
  var [sgstList,setSgstList] = useState([])
  const [showInvoice, setShowInvoice] = useState(false)
  const [per, setPer] = useState("")

  const currency = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };



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
                <TableForm showInvoice={showInvoice} setShowInvoice={setShowInvoice} setDetails={setDetails} currency={currency} sgstValue={sgstValue} setSgstValue={setSgstValue} itemTotal={itemTotal} setItemTotal={setItemTotal} taxTotal={taxTotal} setTaxTotal={setTaxTotal} sgstList={sgstList} setSgstLis={setSgstList} setTotalAmount={setTotalAmount} list={list} setList={setList} total={total} setTotal={setTotal} per={per} setPer={setPer}/>
            </div>
          </>)
        }
      </main>
    </>
  );
}

export default App;
