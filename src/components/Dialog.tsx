"use client"

import React, { MouseEvent, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/Dialog.scss';

export interface DialogProps {
    title: string;
    children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({title, children}) => {
    const router = useRouter()

    const handleCloseEvent = (event: MouseEvent<HTMLDivElement>) => {
        router.back()
    }

    if (!children) {
        return (<h1>No Child Element Being Provided</h1>)
    }
    return (
        <>
            <div className="dialog__overlay" onClick={handleCloseEvent }></div>
            <div className="dialog__container">
                <div className="dialog__header">
                    <h2>{title}</h2>
                    <span className='dialog__close' onClick={handleCloseEvent } >&times;</span>
                </div>
                <div className="dialog__content">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Dialog
