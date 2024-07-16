import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

const environment = process.env.NODE_ENV
export default function TopNav({className}: {className?: string}) {
    return (
        <nav className={cn(className, "flex items-center lg:flex-col")}>
            
        </nav>
        
    );    
    
}
