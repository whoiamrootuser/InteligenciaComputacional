import React from 'react';

export const DnaIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 4.75a2 2 0 10-4 0 2 2 0 004 0zM17.75 4.75a2 2 0 10-4 0 2 2 0 004 0zM10.25 19.25a2 2 0 10-4 0 2 2 0 004 0zM17.75 19.25a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 4.75s-2 1.5-2 4.25-2 4.25-2 4.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19.25s2-1.5 2-4.25 2-4.25 2-4.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.5s1.5-1.5 3.5-1.5 3.5 1.5 3.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.5s-1.5 1.5-3.5 1.5-3.5-1.5-3.5-1.5" />
    </svg>
);
