import React, { useRef } from 'react'
import ReactToPrint from "react-to-print";
import NumToWords from "./NumToWords"

export default function Table({ details, list, total, currency,sgstList,taxTotal,totalAmount,itemTotal,per}) {
  const componentRef = useRef()
  return (
    <>
      <div className='p-5' ref={componentRef}>
        <header className="flex flex-col items-center justify-center mb-5">
          <div>
            <h1 className="font-bold tracking-wide text-2xl mb-3" >Tax Invoice</h1>
          </div>
        </header>
        <div className="mainDetail grid grid-cols-2">
          <div className='name'>
            <span>{details.name}</span>
            <p>{details.address}</p>
            <p>GSTIN/UIN: {details.gstin}</p>
            <p>State Name: {details.state}, Code: {details.code}</p>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <div className="box grid grid-rows-2"><p>Invoice No.</p><span>{details.invoiceNumber}</span></div> 
              <div className="box grid grid-rows-2"><p>Delivery Note</p><span></span></div> 
              <div className="box grid grid-rows-2"><p>Supplier's Ref</p><span></span></div> 
              <div className="box grid grid-rows-2"><p>Buyer's Order No.</p><span></span></div> 
            </div>
            <div>
              <div className="box side grid grid-rows-2"><p>Dated </p><span>{details.invoiceDate}</span></div> 
              <div className="box side grid grid-rows-2"><p>Mode/Terms of Payment</p><span></span></div> 
              <div className="box side grid grid-rows-2"><p>Other Reference(s)</p><span></span></div> 
              <div className="box side grid grid-rows-2"><p>Dated</p><span></span></div> 
            </div>
          </div>
          <div className='name'>
            <p className='text-sm'>Buyer</p>
            <span>{details.clientName}</span>
            <p>{details.clientAddress}</p>
            <p>State Name: {details.clientState}, Code: {details.clientCode}</p>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <div className="box grid grid-rows-2"><p>Despatch Document No.</p><span></span></div> 
              <div className="box grid grid-rows-2"><p>Dispached Throgh</p><span></span></div>  
            </div>
            <div>
              <div className="box side grid grid-rows-2"><p>Delivery Note Date</p><span></span></div> 
              <div className="box side grid grid-rows-2"><p>Destination</p><span></span></div> 
            </div>
            <div className="terms col-span-2">Terms of Delivery</div>
          </div>
        </div>
        <table className='w-full list' >
          <thead>
            <tr className="bg-gray-200">
              <th className="sn">S.No</th>
              <th className='desc'>Description</th>
              <th>HSN/SAC</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>per</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody height="250px">
          {list.map(({ sn, id, description, hsn, quantity, rate, per, amount }) => (
            <React.Fragment key={id} >
                <tr height="30px">
                  <td>{sn}</td>
                  <td><span>{description}</span></td>
                  <td>{hsn}</td>
                  <td className='text-right'>{quantity} {per}</td>
                  <td className='text-right'>{rate}</td>
                  <td>{per}</td>
                  <td className='text-right'>{currency(amount)}</td>
                </tr>
            </React.Fragment>
          ))}
            <tr ><td></td><td></td><td></td><td></td><td></td><td></td><br /></tr>
            <tr className='text-right' height="30px">
              <td></td>
              <td><span className='italic'>SGST</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{currency(taxTotal)}</td>
            </tr>
            <tr className='text-right' height="30px">
              <td></td>
              <td><span className='italic'>CGST</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{currency(taxTotal)}</td>
            </tr>
            <tr className='text-right' height="30px">
              <td></td>
              <td><span className='italic'>ROUND OFF</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{(Math.round(taxTotal*2+total)*1-(taxTotal*2+total)*1).toFixed(2)}</td>
            </tr>
            <tr ><td></td><td></td><td></td><td></td><td></td><td></td><br /></tr>
          </tbody>
          <tbody>
          <tr className='border-t-2 border-black'>
              <td></td>
              <td className='text-right'>Total</td>
              <td></td>
              <td className='text-right'>{currency(itemTotal)} {per}</td>
              <td></td>
              <td></td>
              <td className='text-right'><span>₹ {currency(totalAmount)}</span></td>
            </tr>
          </tbody>
        </table>
        <div className="name"><div className='flex flex-cols-2 justify-between text-sm'><p>Amount Chargable (in words)</p><i>E & E.O</i> </div><span className="capitalize">INR {NumToWords(totalAmount)} only</span></div>
        <table className="w-full">
          <tbody className="text-center">
            <tr>
              <td rowspan="2" >HSN/SAC</td>
              <td rowspan="2">Taxable Value</td>
              <td colspan="2">Central Tax</td>
              <td colspan="2">State Tax</td>
              <td rowspan="2" width="100px">Total Tax Amount</td>
            </tr>
            <tr>
              <td>Rate</td>
              <td>Amount</td>
              <td>Rate</td>
              <td>Amount</td>
            </tr>
            {sgstList.map(({sgst,taxValue,taxAmount,hsn}) => (
            <React.Fragment key={sgst} >
                <tr height="30px">
                  <td>{hsn}</td>
                  <td>{currency(taxValue)}</td>
                  <td>{sgst}%</td>
                  <td>{currency(taxAmount)}</td>
                  <td>{sgst}%</td>
                  <td>{currency(taxAmount)}</td>
                  <td>{currency(taxAmount*2)}</td>
                </tr>
            </React.Fragment>
          ))}
            <tr>
              <td className='text-right' ><span>Total</span></td>
              <td><span>{currency(total)}</span></td>
              <td></td>
              <td><span>{currency(taxTotal)}</span></td>
              <td></td>
              <td><span>{currency(taxTotal)}</span></td>
              <td><span>{currency(taxTotal*2)}</span></td>
            </tr>
          </tbody>
        </table>
        <div className='footer'>
          <div>
              <p>Amount Chargable (in words): <span className='text-base capitalize'>INR {NumToWords(taxTotal*2)} only</span></p>
          </div>
          <div className='last grid grid-cols-2'>
            <div><u>Declaration</u><p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p></div>
            <div className="name w-full"><span>from {details.name}</span>
            <p style={{"margin-top":"15px"}} >Authorised Signature</p>
            </div>
          </div>
        </div>
        <div className="grid pt-2 place-items-center" >This is a Computer Generated Invoice</div>
      </div>
      <ReactToPrint
          trigger={() => <button className='m-5 text-white font-bold bg-green-500 py-2 px-4 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300'>Print/Download</button>}
          content={() => componentRef.current} />
    </>
  )
}
