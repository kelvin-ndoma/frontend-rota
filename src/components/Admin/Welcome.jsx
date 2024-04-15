import React from 'react';
import Cards from './Cards';

const Welcome = ({ user }) => {
    const now = new Date();

    const time = now.toLocaleTimeString('EAT', { hour: '2-digit', minute: '2-digit' });
    const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

    return (
        <div className='welcome-pg'>
            <section className="flex size-full flex-col gap-5">
                <div className="h-[303px] w-full rounded-[20px] bg-bgWelcome bg-cover p-4">
                    <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    {/* <h1 className="font-semibold text-xl">Welcome {user.first_name}</h1> */}
                        <h2 className="glassmorphism text-base font-normal">
                            Upcoming event at:
                        </h2>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
                            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
                        </div>
                    </div>
                </div>
            </section>
            <Cards />
        </div>
    );
};

export default Welcome;
