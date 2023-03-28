import * as React from 'react'
import { Root, createRoot } from 'react-dom/client'
import VoiceControl from '../components/VoiceControl/VoiceControl'

export const containerSelector = 'form *:has(> textarea)'
export const buttonSelector = 'form *:has(> textarea) > button'

class VoiceControlUI {
	static element: HTMLElement
	static root: Root
	static initialize() {
		if (!this.element) {
			this.element = document.createElement('span')
			this.root = createRoot(this.element)
		}
		this.root.render(<VoiceControl />)
		document.querySelector(buttonSelector).setAttribute('style', 'display: none;')
		document.querySelector(containerSelector).appendChild(this.element)
	}
	static terminate() {
		this.root.render(<></>)
		this.element.remove()
	}
}

const integrateVoiceControl = () => {
	let observer: MutationObserver
	observer = new MutationObserver(() => {
		if (!document.contains(VoiceControlUI.element) && document.querySelector(containerSelector)) {
			VoiceControlUI.initialize()
		}
	})
	observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true })
}

export { integrateVoiceControl } 