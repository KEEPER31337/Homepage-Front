import React from 'react';

const Notice = () => {
    return (
        <div className="mt-0">
            <div className="max-w-3xl mx-auto px-2 lg:px-8 mt-8">
                <div className="p-2 rounded-lg bg-mainYellow text-mainBlack shadow-lg sm:p-3">
                    <div className="flex items-center justify-between flex-wrap">
                        {<NoticeIcon />}
                        {<NoticeContent />}
                        {<CloseNotice />}
                    </div>
                </div>
            </div>
        </div>
    )
}


const NoticeIcon = () => {
    return (
        <span className="flex p-2 rounded-lg bg-mainYellow border-mainBlack border-2"> 
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        </span>
    )
}


const NoticeContent = () => {
    return (
        <div className="w-0 flex-1 flex items-center">
            <p className="ml-3 font-semibold truncate text-lg">
                <span className="inline"> 곧 (2/25) 기술 문서 최종 발표 날입니다! </span>
            </p>
        </div>
    )
}


const CloseNotice = () => {
    return (
        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-mainYellow focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only"> Dismiss </span>            
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}


export default Notice;