import React from 'react'

export default function Footer({name,email,address,phone,website,bankName,bankAccountNumber}) {
  return (
    <>
    <footer className='footer border-t-2 border-gray-100'>
        <ul className="flex flex-wrap items-center justify-center">
          <li><span className="font-bold">Your Name:</span>{name}</li>
          <li><span className="font-bold">Your Email:</span>{email}</li>
          <li><span className="font-bold">Your Address:</span>{address}</li>
          <li><span className="font-bold">Phone Number:</span>{phone}</li>
          <li><span className="font-bold">Bank:</span>{bankName}</li>
          <li><span className="font-bold">Account Holder:</span>{name}</li>
          <li><span className="font-bold">Account Number:</span>{bankAccountNumber}</li>
          <li><span className="font-bold">Website:</span>{website}</li>
        </ul>
      </footer>
    </>
  )
}
