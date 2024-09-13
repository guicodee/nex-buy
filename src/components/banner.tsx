import Image from "next/image";

interface BannerProps {
  src: string
  alt: string
  classname: string
}

export default function Banner({ alt, classname, src }: BannerProps) {

  return (
    <Image 
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={`h-auto w-full ${classname}`}
    />
  )
}