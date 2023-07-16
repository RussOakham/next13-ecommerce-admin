'use client'

import { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import Modal from '../ui/modal'

interface AlertModalProps {
	isOpen: boolean
	loading: boolean
	onClose: () => void
	onConfirm: () => void
}

const AlertModal = ({
	isOpen,
	loading,
	onClose,
	onConfirm,
}: AlertModalProps) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)

		return () => setIsMounted(false)
	}, [])

	if (!isMounted) return null

	return (
		<Modal
			title="Are you sure?"
			description="This action cannot be undone"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex w-full items-center justify-end space-x-2 pt-6">
				<Button variant="outline" onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button variant="destructive" onClick={onConfirm} disabled={loading}>
					Delete
				</Button>
			</div>
		</Modal>
	)
}

export default AlertModal
