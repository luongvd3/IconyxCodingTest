import React from 'react';

export default async function Footer({className}: {className?: string}) {

    return (
        <section className={className}>
            <div className='hidden bg-white lg:block '></div>
            <div className='bg-gray-50 px-3 pt-4 lg:bg-white'>
                <div className='flex h-20 flex-col gap-10 bg-gray-50 px-16 py-4'>

                </div>                
            </div>
            <div className='hidden bg-white xl:block'></div>
        </section>
        
    );
};
