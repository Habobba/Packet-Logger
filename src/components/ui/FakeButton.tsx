import React from 'react'

interface ButtonProps {
    type?: 'success' | 'danger' | 'warning' | 'info'
    message: string
    classes?: string
}

export default function FakeButton({
    message,
    type = 'success',
    classes = ''
}: ButtonProps) {
    const colors = {
        success: 'hb-text-green-400 hb-border-green-500',
        danger: 'hb-text-red-400 hb-border-red-500',
        warning: 'hb-text-yellow-400 hb-border-yellow-500',
        info: 'hb-text-blue-500 hb-border-blue-500'
    }

    return (
        <div className={`hb-px-2.5 hb-py-1 hb-text-xs hb-rounded-xl hb-border hb-border-transparent hb-text-white ${colors[type]} ${classes}`}>
            {message}
        </div>
    )
}