import React from 'react'
import { Carousel, CarouselContent, CarouselPrevious, CarouselItem, CarouselNext } from '@components/ui/carousel'
import { Card, CardContent } from "@components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { diseasesConfig, diseaseKeys } from '@config/diseases.config'

export default function diseases() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#BF5050]">
            <Carousel className="w-full max-w-4xl">
                <CarouselContent>
                    {Array.from({ length: 4 }).map((_, index) => {
                        const diseaseKey = diseaseKeys[index];
                        const disease = diseasesConfig[diseaseKey];

                        return (
                            <CarouselItem key={index} className='basis-1/2'>
                                <div className="p-4">
                                    <Link href={disease.route}>
                                        <Card className="h-80 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20 border-2 border-transparent hover:border-white/30 overflow-hidden">
                                            <CardContent className="flex flex-col p-0 w-full h-full">
                                                <div className="relative w-full flex-1 transition-transform duration-300 group-hover:scale-110 overflow-hidden">
                                                    <Image
                                                        src={disease.image}
                                                        alt={disease.title}
                                                        fill
                                                        className="object-cover rounded-t-lg"
                                                    />
                                                </div>
                                                <div className="p-4 bg-white rounded-b-lg">
                                                    <h3 className="text-lg font-semibold text-center text-gray-800 transition-colors duration-300 hover:text-gray-900">
                                                        {disease.title}
                                                    </h3>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
