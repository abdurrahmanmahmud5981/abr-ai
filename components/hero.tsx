"use client";
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
const HeroSection: React.FC = () => {
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imageElement = imageRef.current;
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100; // Adjust this value as needed
            if (scrollPosition > scrollThreshold) {
                imageElement?.classList.add('scrolled');
            } else {
                imageElement?.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        
    }, [])
    return (
        <section className='w-full pt-36 md:pt-48 pb-10'>
            <div className=" space-y-6 text-center">
                <div className="space-y-6 text-center">
                    <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>
                        Your AI Career Companion for
                        <br />
                        Creative Discussions
                    </h1>
                    <p className='mx-auto max-w-[600px] text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground'>
                        Engage in meaningful discussions with our AI, designed to enhance your productivity and creativity.
                    </p>
                </div>
                <div className="flex justify-center space-x-4 ">
                    <Link href="/dashboard" className="">
                        <Button size={"lg"} className="px-8">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/features" className="">
                        <Button size={"lg"} variant={"outline"} className="px-8">
                            Explore Features
                        </Button>
                    </Link>
                </div>
                <div className="hero-image-container mt-5 md:mt-0">
                    <div ref={imageRef} className="hero-image">
                        <Image
                            src="/banner.jpg"
                            width={1200}
                            height={600}
                            alt="Your AI Companion"
                            className=" object-cover rounded-lg shadow-2xl mx-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection