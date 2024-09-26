import Image from 'next/image';
import Link from 'next/link';

interface BannerProps {
	src: string;
	alt: string;
	classname: string;
	href: string;
}

export default function Banner({ alt, classname, src, href }: BannerProps) {
	return (
		<Link href={href} className={classname}>
			<Image
				src={src}
				alt={alt}
				width={0}
				height={0}
				sizes="100vw"
				className={`h-auto w-full ${classname}`}
			/>
		</Link>
	);
}
