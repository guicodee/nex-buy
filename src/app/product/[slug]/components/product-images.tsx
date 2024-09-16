'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ProductImagesProps {
	imagesUrls: string[];
	name: string;
}

export default function ProductImages({
	imagesUrls,
	name,
}: ProductImagesProps) {
	const [currentImage, setCurrentImage] = useState(imagesUrls[0]);

	function handleNextImageToSelect(imageUrl: string) {
		setCurrentImage(imageUrl);
	}

	return (
		<>
			<div className="bg-zinc-900 flex items-center justify-center w-full lg:h-[670px] max-lg:h-[470px] rounded-lg lg:relative">
				<Image
					src={currentImage}
					alt="djsajdsap"
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto max-w-[70%] max-h-[80%]"
				/>
			</div>

			<div className="grid grid-cols-4 gap-3 px-5 mt-7 mb-4 lg:absolute top-28 left-10 lg:flex lg:flex-col">
				{imagesUrls.map((imageUrl) => (
					<button
						onClick={() => handleNextImageToSelect(imageUrl)}
						key={imageUrl}
						className={`max-lg:bg-accent lg:bg-zinc-950 rounded-xl flex items-center justify-center h-[100px]
              ${imageUrl === currentImage && 'border-2 border-violet-700'} 
          `}
					>
						<Image
							src={imageUrl}
							alt={name}
							width={0}
							height={0}
							sizes="100vw"
							className="h-auto max-h-[70%] w-auto max-w-[80%]"
						/>
					</button>
				))}
			</div>
		</>
	);
}
