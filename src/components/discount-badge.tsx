import { ArrowDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Badge, BadgeProps } from './ui/badge';

export default function DiscountBadge(
  { children, className, ...props }: BadgeProps
) {
  return (
    <Badge
      variant={'primary'}
      className={twMerge( 'gap-1', className ) }
      {...props}>
      <ArrowDown size={16} /> {children}%
    </Badge>
  );
}