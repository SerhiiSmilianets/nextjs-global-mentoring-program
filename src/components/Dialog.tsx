import React, { MouseEvent, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Dialog.scss';

export interface DialogProps {
    title: string;
    children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({title, children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        navigate(`/${location.search}`);
    }

    if (!children) {
        return (<h1>No Child Element Being Provided</h1>)
    }
    return (
        <>
            <div className="dialog__overlay" onClick={handleOverlayClick}></div>
            <div className="dialog__container">
                <div className="dialog__header">
                    <h2>{title}</h2>
                    <Link to={`/${location.search}`} >&times;</Link>
                </div>
                <div className="dialog__content">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Dialog
