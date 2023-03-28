import * as React from 'react'
import { FC, ReactNode, useEffect, useState } from 'react'
import { BiMicrophone } from 'react-icons/bi'
import { FaHeart } from 'react-icons/fa'
import { CgMail } from 'react-icons/cg'
import { TbExternalLink, TbVolume } from 'react-icons/tb'

const KeyboardKey: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className='inline-block bg-gray-600 rounded px-1 text-gray-200 font-light'>{children}</div>
	)
}

const Home: FC = () => {
	const [status, setStatus] = useState(-1)

	useEffect(() => {
		chrome.tabs.query({ active: true, url: ['https://chat.openai.com/*'] }).then(([tab]) => {
			setStatus(tab ? 1 : 0)
		})
	}, [])

	return (
		<div className='w-[250px] bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-[Jost] p-5 text-base font-normal dark:font-light'>
			{
				status === -1 ? <>...</> : (
					status === 0 ? (
						<div>
							<div className='mb-5'>This extension is only available on ChatGPT.</div>
							<a className='bg-emerald-500 rounded-md h-8 flex items-center font-normal px-2.5 text-white w-fit gap-2.5' href='https://chat.openai.com/chat' target='_blank'>
								<span>Go to ChatGPT</span>
								<TbExternalLink className='w-5 h-5' />
							</a>
						</div>
					) : (
						<>
							<div className='mb-2.5'>Usage guide:</div>
							<ul className='text-sm list-disc ml-[18px] grid grid-cols-1 gap-2.5 mb-5'>
								<li>Press the <KeyboardKey>Space</KeyboardKey> key (outside input field) or click on the <BiMicrophone className='w-5 h-5 inline-block bg-gray-600 rounded p-0.5 text-gray-200' /> icon to turn on voice control and start speaking.</li>
								<li>For long voice input with multiple sentences press and hold the <KeyboardKey>Space</KeyboardKey> key until you finish speaking.</li>
								<li>Click on the <TbVolume className='w-5 h-5 inline-block bg-gray-600 rounded p-0.5 text-gray-200' /> icon to turn off/on read aloud.</li>
							</ul>
							<div className='text-center'>
								<div>Made with <FaHeart className='w-4 h-4 text-rose-500 inline' /></div>
								<a className='text-xs text-emerald-600 dark:text-emerald-400 flex items-center underline gap-0.5' href='mailto:aminulfse@gmail.com?subject=free chocolate'><CgMail className='w-3.5 h-3.5 inline' /> Mail me to report an issue or for help.</a>
							</div>
						</>
					)
				)
			}
		</div>
	)
}

export default Home