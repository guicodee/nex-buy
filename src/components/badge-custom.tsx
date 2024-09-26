import { ReactNode } from 'react';
import { Badge, BadgeProps } from './ui/badge';

interface BadgeCustomProps extends BadgeProps {
	classname?: string;
	icon?: ReactNode;
	text: string;
}

export default function BadgeCustom({
	classname,
	icon,
	text,
	...props
}: BadgeCustomProps) {
	return (
		<Badge
			variant={'outline'}
			className={`px-4 py-2 flex items-center gap-3 w-fit uppercase font-bold text-base border-violet-400 ${classname}`}
			{...props}
		>
			{icon}
			{text}
		</Badge>
	);
}
