import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { BiMicrophone } from 'react-icons/bi'
import { Language } from './LanguageSwitcher'
import VoiceRecognition, { VoiceRecognitionResults } from './VoiceRecognition'
import { triggerEvent } from '../../utils'

let enabledMultiSentences = false

const VoiceMessaging: FC<{ language: Language }> = ({ language }) => {
    const [active, setActive] = useState(false)

    const toggleActive = () => {
        setActive(!active)
    }

    const handleRecognition = ({ isFinal, value }: VoiceRecognitionResults) => {
        value = value.trim()
        const textarea = document.querySelector('form textarea') as HTMLTextAreaElement
        if (value) {
            let message: string
            if (enabledMultiSentences) {
                let sentences = textarea.value.split('\n')
                if (isFinal) {
                    sentences[sentences.length - 1] = value
                    sentences.push('')
                } else {
                    sentences[sentences.length - 1] = value
                }
                message = sentences.join('\n')
            } else message = value
            textarea.value = message
            triggerEvent(textarea, 'input')
        }
    }

    const handleKeyDown = ({ target, code }: KeyboardEvent) => {
        if (target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement) return
        if (code === 'Space') {
            enabledMultiSentences = true
            setActive(active => !active ? true : active)
        }
    }

    const handleKeyUp = ({ target, code }: KeyboardEvent) => {
        if (target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement) return
        if (code === 'Space') {
            enabledMultiSentences = false
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <>
            {active && <VoiceRecognition onRecognize={handleRecognition} language={language} />}
            <div
                title={active ? 'Listening...' : 'Voice control'}
                onClick={toggleActive}
                className={`absolute bottom-1.5 right-1 md:bottom-2.5 md:right-2 cursor-pointer rounded-md w-7 h-7 flex items-center justify-center ${active ? 'text-white bg-rose-500' : 'text-gray-500 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900'}`}
            >
                <BiMicrophone className={`w-5 h-5 ${active ? 'animate-bounce mb-[-5px] text-white' : ''}`} />
            </div>
        </>
    )
}

export default VoiceMessaging