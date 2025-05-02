'use client'

import { ComponentType } from 'react'
import dynamic from 'next/dynamic'

export interface Organ {
    id: string
    name: string
    Component: ComponentType<any>
    alt: string
}

export const OrgansData: Organ[] = [
    {
        id: 'human-body',
        name: 'Cuerpo Humano',
        Component: dynamic(() => import('@components/ui/DiseasesModels/HumanBody'), { ssr: false }),
        alt: 'Modelo 3D de cuerpo humano',
    },
    {
        id: 'spleen',
        name: 'Bazo',
        Component: dynamic(() => import('@components/ui/DiseasesModels/HomeSpleen'), { ssr: false }),
        alt: 'Modelo 3D de bazo',
    },
]
