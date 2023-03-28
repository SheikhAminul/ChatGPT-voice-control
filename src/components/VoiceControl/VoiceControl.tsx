import * as React from 'react'
import { FC } from 'react'
import useLocalSync from '../../hooks/use-local-sync'
import SendButton from './SendButton'
import LanguageSwitcher from './LanguageSwitcher'
import ReadAloud from './ReadAloud'
import VoiceMessaging from './VoiceMessaging'

import '../../assets/styles/tailwind.css'

const VoiceControl: FC = () => {
	const [language, setLanguage] = useLocalSync('language', navigator.language || 'en-US')

	return (
		<>

			<SendButton />
			<div className='inline group'>
				<LanguageSwitcher language={language} onLanguageChange={language => setLanguage(language)} />
				<ReadAloud language={language} />
				<VoiceMessaging language={language} />
			</div>
		</>
	)
}

export default VoiceControl