import * as React from 'react'
import { FC, useState } from 'react'
import { BiCaretDown } from 'react-icons/bi'
import languages from '../../utils/languages'

export type Language = keyof typeof languages

const LanguageSwitcher: FC<{
    onLanguageChange: (language: Language) => void,
    language: Language
}> = ({ onLanguageChange, language }) => {
    const [visible, setVisible] = useState(false)
    return (
        <div
            title='Change speech recognition / your language'
            onClick={() => setVisible(!visible)}
            className={`absolute z-10 rounded-md border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200 top-[-40px] h-6 flex items-center right-9 w-max ${!visible ? 'opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-[opacity,visibility] delay-[2000ms] group-hover:delay-[0ms] duration-[500ms]' : ''}`}
        >
            <div className='cursor-pointer text-xs h-6 flex items-center justify-center pl-1.5 pr-1 gap-0.5 relative'>
                <div>{languages[language]}</div>
                <BiCaretDown className='w-3.5 h-3.5' />
                {
                    visible && (
                        <div className='absolute bottom-9 right-[-33px] h-80 dark:bg-gray-800 dark:text-gray-200 overflow-y-scroll dark:border-gray-900 border rounded-md py-0.5'>
                            {
                                Object.entries(languages).map(([language, name]) => (
                                    <option key={language} onClick={() => onLanguageChange(language as any)} className='px-1.5 py-0.5 dark:hover:bg-gray-900 hover:bg-gray-200' >{name}</option>
                                ))
                            }
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default LanguageSwitcher