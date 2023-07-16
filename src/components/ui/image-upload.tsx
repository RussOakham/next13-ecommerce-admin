'use client'

import { useEffect, useState } from 'react'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from './button'

interface ImageUploadProps {
	disabled?: boolean
	onChange: (value: string) => void
	onRemove: (value: string) => void
	value: string[]
}

type ImageUploadResult = {
	info: {
		secure_url: string
	}
}

const ImageUpload = ({
	disabled,
	onChange,
	onRemove,
	value,
}: ImageUploadProps) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)

		return () => setIsMounted(false)
	}, [])

	if (!isMounted) return null

	const onUpload = (result: ImageUploadResult) => {
		onChange(result.info.secure_url)
	}

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						key={url}
						className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
					>
						<div className="absolute right-2 top-2 z-10">
							<Button
								variant="destructive"
								size="icon"
								onClick={() => onRemove(url)}
							>
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<Image
							className="object-cover"
							alt="Image"
							src={url}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset="jftheduo">
				{({ open }) => {
					const onClick = () => {
						open()
					}

					return (
						<Button variant="secondary" onClick={onClick} disabled={disabled}>
							<ImagePlus className="mr-2 h-4 w-4" />
							Upload an Image
						</Button>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}

export default ImageUpload
