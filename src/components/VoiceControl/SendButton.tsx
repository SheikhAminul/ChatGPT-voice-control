import * as React from 'react'
import { FC } from 'react'
import { RxPaperPlane } from 'react-icons/rx'
import { buttonSelector } from '../../utils/voice-control'

const SendButton: FC = () => {
    return (
        <div
            title='Send message'
            onClick={() => (document.querySelector(buttonSelector) as any).click()}
            className='absolute bottom-1.5 right-10 md:bottom-2.5 md:right-11 cursor-pointer p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 w-7 h-7 flex items-center justify-center'
        >
            <div className='w-5 h-5 flex items-center justify-center'><RxPaperPlane className='w-4 h-4' /></div>
        </div>
    )
}

export default SendButton