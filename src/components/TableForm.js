import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

export default function TableForm({ sn, setSn, description, setDescription, hsn, setHsn, per, setPer, sgst, setSgst, quantity, setQuantity, rate, setRate, amount, setAmount, list, setList, total, setTotal, sgstValue, setSgstValue, itemTotal, setItemTotal, taxTotal, setTaxTotal,sgstList,setSgstList}) {
    const [isEditing, setIsEditing] = useState(false)

    // Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            sn,
            hsn,
            id: uuidv4(),
            description,
            quantity,
            rate,
            per,
            amount,
            sgst
        }
        setSn(sn + 1)
        setDescription("")
        // setHsn()
        setQuantity("")
        setRate("")
        setSgst("")
        setAmount(0)
        setTotal(total*1 + amount*1); 
        updateSgst(sgst,amount)
        setList([...list, newItem])
        setIsEditing(false)
        console.log(list,sgstValue)
    }

    // Calculate Amount
    useEffect(() => {
        const calcAmount = () => {
            setAmount((quantity * rate).toFixed(2));
        }
        calcAmount()
    }, [rate, quantity])

    // Delete funtion
    const deleteRow = (id) => {
        setList(list.filter((row) => row.id !== id))
        setSn(sn - 1)
    }

    const updateSgst = (sgst,amount) =>{
        let updatedValue = {};
        let tempTax = amount*sgst*.01
        let tempTaxTotal = tempTax+taxTotal*1
        setItemTotal(itemTotal+quantity*1)
        setTaxTotal(tempTaxTotal.toFixed(2))
        if (sgstValue?.[sgst]) {
            updatedValue = {[sgst]:{"sgst":sgst,"taxAmount":sgstValue[sgst]["taxAmount"]*1+tempTax.toFixed(2)*1,"taxValue":sgstValue[sgst]["taxValue"]*1+amount*1,"hsn":sgstValue[sgst]["hsn"]+hsn*1}};
        }
        else{
            updatedValue = {[sgst]:{"sgst":sgst,"taxAmount":tempTax.toFixed(2)*1,"taxValue":amount*1,"hsn":hsn*1}};
        }
        setSgstValue(sgstValue => ({
            ...sgstValue,
            ...updatedValue
            }));
        // Object.entries(sgstValue).forEach(([key, value]) => {
        //     sgstList.push(value)
        // });   
    }

    // const updateSgst = ()=>{
    //     var tempAmount = amount
    //     var tempHsn = hsn
    //     var tempTaxableValue = amount
    //     var tempTaxAmount = amount*sgst*.01

    //     if(sgstValue.find((row) => row.sgst === sgst)){
    //         var tempSgstValue = sgstValue.find((row) => row.sgst === sgst)
    //         tempAmount += amount
    //         tempTaxAmount += tempSgstValue["taxAmount"]
    //         setSgstValue(sgstValue.filter((row) => row.sgst !== sgst))
    //         setSgstValue([...sgstValue,{hsn:tempHsn,amount:tempTaxableValue,sgst,"taxAmount":tempTaxAmount}])
    //     }
    //     else{
    //         setSgstValue([...sgstValue,{hsn,amount,sgst,"taxAmount":tempTaxAmount}])
    //     }
    //     Object.keys(sgstValue).forEach(function(key) {
    //         console.log(key)
    // })}

    // Edit Function
    const editRow = (id) => {
        const editingRow = list.find((row) => row.id === id)
        setIsEditing(true)
        setDescription(editingRow.description)
        setHsn(editingRow.hsn)
        setQuantity(editingRow.quantity)
        setRate(editingRow.rate)
        setPer(editingRow.per)
        setSgst(editingRow.sgst)
        setAmount(editingRow.amount)
        deleteRow(id)
        setSn(sn - 1)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mt-10 md:grid grid-cols-3 gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="description">Item description</label>
                        <input type="text" name="description" id="description" placeholder="Item description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="sgst">Enter SGST/CGST</label>
                        <input type="number" name="sgst" id="sgst" placeholder="Enter sgst" autoComplete='off' value={sgst} onChange={(e) => setSgst(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="per">per</label>
                        <input type="text" name="per" id="per" placeholder="Item per" value={per} onChange={(e) => setPer(e.target.value)} required />
                    </div>
                </div>
                <div className="md:grid grid-cols-4 gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="hsn">HSN/SAC</label>
                        <input type="number" name="hsn" id="hsn" placeholder="hsn" value={hsn} onChange={(e) => { setHsn(e.target.value) }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" name="quantity" id="quantity" placeholder="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="rate">Item rate</label>
                        <input type="number" name="rate" id="rate" placeholder="rate" value={rate} onChange={(e) => { setRate(e.target.value) }} required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="amount">Item amount</label>
                        <p>₹ {amount}</p>
                    </div>
                </div>
                <button className='mt-5 text-white font-bold bg-blue-500 py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300' type="submit">{isEditing ? "Edit Item" : "Add Item"}</button>
                <table className='my-5 w-full'>
                    <thead>
                        <tr className="bg-gray-200">
                            <th className='font-bold'>S.No</th>
                            <th className='font-bold'>Description of Goods</th>
                            <th className='font-bold'>HSN/SAC</th>
                            <th className='font-bold'>Quantity</th>
                            <th className='font-bold'>Rate</th>
                            <th className='font-bold'>per</th>
                            <th className='font-bold'>Amount</th>
                            <th className='font-bold'>Action</th>
                        </tr>
                    </thead>
                    {list.map(({ sn, id, description, hsn, quantity, rate, per, amount }) => (
                        <React.Fragment key={id} >
                            <tbody>
                                <tr>
                                    <td>{sn}</td>
                                    <td>{description}</td>
                                    <td>{hsn}</td>
                                    <td>{quantity}</td>
                                    <td>{rate}</td>
                                    <td>{per}</td>
                                    <td>{amount}</td>
                                    <td>
                                        <button onClick={() => { deleteRow(id); setTotal((total*1 - amount*1).toFixed(2)) }}><AiOutlineDelete className='text-red-500 font-bold text-xl' /></button>
                                        <button onClick={() => { editRow(id); setTotal((total*1 - amount*1).toFixed(2)) }}><AiOutlineEdit className='ml-3 text-green-500 font-bold text-xl' /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </React.Fragment>
                    ))}
                </table>
                <div>
                    <h2 className="flex items-end justify-end text-gray-800 text-2xl font-bold capitalize">Total: ₹ {total}</h2>
                </div>
            </form>
        </>
    )
}
