const allowedTags = ['P', 'LI']

class MessagesObserver {
    static elements: Element[]
    static onMutation(mutations: MutationRecord[]) {
        const { elements } = MessagesObserver
        mutations.forEach(({ target }) => {
            if (target.nodeType === 3) {
                const { parentElement } = target
                if (parentElement && !elements.includes(parentElement) && allowedTags.includes(parentElement.tagName) && parentElement.closest('.whitespace-pre-wrap') && getComputedStyle(parentElement, '::after').content !== 'none') elements.push(parentElement)
            }
        })
        elements.forEach(element => {
            if (!document.contains(element)) {
                elements.splice(elements.indexOf(element), 1)
            } else if (getComputedStyle(element, '::after').content === 'none') {
                elements.splice(elements.indexOf(element), 1)
                const message = element.textContent.trim()
                message && MessagesObserver.onResponse?.(message)
            }
        })
    }
    static observer = new MutationObserver(this.onMutation)
    static onResponse: (message: string) => void
    static initialize({ onResponse }: { onResponse: (message: string) => void }) {
        this.elements = []
        this.onResponse = onResponse
        this.observer.observe(document, { attributes: false, childList: true, characterData: true, subtree: true })
    }
    static terminate() {
        this.elements = []
        this.onResponse = null
        this.observer.disconnect()
    }
}

export default MessagesObserver