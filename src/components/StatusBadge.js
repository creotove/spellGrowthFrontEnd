import React from 'react'

const StatusBadge = ({status}) => {
  return (
    // <div>{status}</div>
    <>
      {status === "Pending" ? (
        <span className="px-2 py-1 font-semibold leading-tight text-black bg-yellow-400 rounded-full dark:bg-yellow-700 dark:text-yellow-100">
          Pending
        </span>
      ) : status === "Paid" ? (
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
          Paid
        </span>
      ) : (
        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100">
          Rejected
        </span>
      )}
    </>
  )
}

export default StatusBadge