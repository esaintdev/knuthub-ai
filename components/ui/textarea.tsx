import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex min-h-[120px] w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm transition-colors',
                    'placeholder:text-gray-400',
                    'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-400',
                    'resize-y',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
