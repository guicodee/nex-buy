import { ReactNode } from 'react';
import { Button, ButtonProps } from './ui/button';

interface CustomButtonProps extends ButtonProps {
	classname?: string;
	onClick?: () => void;
	icon?: ReactNode;
	text: string;
}

export default function CustomButton({
	onClick,
	text,
	classname,
	icon,
	...props
}: CustomButtonProps) {
	return (
		<Button
			className={`w-full justify-start gap-2 ${classname}`}
			onClick={onClick}
			{...props}
		>
			{icon}
			{text}
		</Button>
	);
}
