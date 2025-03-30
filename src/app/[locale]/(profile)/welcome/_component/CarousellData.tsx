"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CarouSelItemData from './CarouSelItemData';
import freelancers from '../../../create-profile/sampledata';
function CarousellData() {
    return (
        <Carousel className='right-5 top-3'>
            <CarouselContent>
                {freelancers.map((freelancer, index) => (
                    <CarouSelItemData key={index} freelancer={freelancer} />
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarousellData