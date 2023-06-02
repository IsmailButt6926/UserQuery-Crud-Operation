import React from 'react'

const Toaster = () => {
   
    return (
        <>
            <div id="toast-bottom-left" className="fixed  flex justify-center items-center w-full  max-w-xs p-4 space-x-4 text-white bg-red-600 divide-x divide-gray-200 rounded-lg shadow bottom-5 left-[37.25rem] dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                <div className="text-base font-normal">Something went wrong</div>
            </div>


        </>
    )
}

export default Toaster