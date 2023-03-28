import { useState } from 'react'
import { setLocal, getLocal } from 'storage-sync-lite'

const useLocalSync = (name: string, defaultValue?: any) => {
	const [value, setValue] = useState((getLocal(name) || defaultValue))

	const changeValue = async (changedValue: any) => {
		if (typeof changedValue === 'function') {
			setValue((value: any) => {
				changedValue = changedValue(value)
				setLocal(name, changedValue)
				return changedValue
			})
		} else {
			setLocal(name, changedValue)
			setValue(changedValue)
		}
	}

	return [value, changeValue]
}

export default useLocalSync