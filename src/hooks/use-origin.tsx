import { useEffect, useState } from 'react'

const useOrigin = () => {
	const [mounted, setMounted] = useState(false)

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: ''

	useEffect(() => {
		setMounted(true)

		return () => setMounted(false)
	}, [])

	if (!mounted) return null

	return origin
}

export default useOrigin
