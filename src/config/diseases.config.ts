import { routes } from './routes.config';

export const diseasesConfig = {
    "abdominal-trauma": {
        title: "TRAUMA ABDOMINAL",
        image: "/assets/diseases/abdominal-trauma.png",
        route: routes.viedman, // /personal-diseases/jsvr
    },
    "trombosis-esplenica": {
        title: "TROMBOSIS ESPLÉNICA",
        image: "/assets/diseases/splenic-thrombosis.png",
        route: routes.brandon, // /personal-diseases/aga
    },
    "infarto-esplenico": {
        title: "INFARTO ESPLÉNICO",
        image: "/assets/diseases/splenic-infarction.png",
        route: routes.trujillo, // /personal-diseases/gdtm
    },
    "quiste-esplenico": {
        title: "QUISTES ESPLÉNICOS",
        image: "/assets/diseases/splenic-cyst.jpg",
        route: routes.hurtado, // /personal-diseases/smh
    }
} as const;

export type DiseaseKey = keyof typeof diseasesConfig;

export const diseaseKeys = Object.keys(diseasesConfig) as DiseaseKey[];
