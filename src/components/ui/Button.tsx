import React from 'react'

interface ButtonProps {
    type?: 'success' | 'danger' | 'warning' | 'info'
    message: string
    classes?: string
}

export default function Button({
    message,
    type = 'success',
    classes = ''
}: ButtonProps) {
    const colors = {
        success: 'hb-bg-green-600 hover:hb-bg-green-500 hb-border-green-500',
        danger: 'hb-bg-red-600 hover:hb-bg-red-500 hb-border-red-500',
        warning: 'hb-bg-yellow-600 hover:hb-bg-yellow-500 hb-border-yellow-500',
        info: 'hb-bg-blue-600 hover:hb-bg-blue-500 hb-border-blue-500'
    }

    return (
        <button className={`hb-px-2.5 hb-py-1 hb-text-xs hb-rounded-lg hb-border hb-border-transparent hb-text-white ${colors[type]} ${classes}`}>
            {message}
        </button>
    )
}