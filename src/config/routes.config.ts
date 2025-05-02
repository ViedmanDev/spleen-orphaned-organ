// src/config/routes.ts

export const routes = {
    home: '/',
    aboutUs: '/about-us',
    curiosities: '/curiosities',
    vargas: '/personal-diseases/gdtm',
    viedman: '/personal-diseases/jsvr',
    hurtado: '/personal-diseases/smh',
    brandon: '/personal-diseases/aga',
    quiz: '/quiz',
};


export const routeTitles: Record<string, string> = {
    '/personal-diseases/jsvr': 'TRAUMA ABDOMINAL',
    '/personal-diseases/aga': 'AGA',
    '/personal-diseases/smh': 'QUISTES ESPLÉNICOS',
    '/personal-diseases/gdtm': 'TROMBOSIS ESPLÉNICA',
    '/about-us': 'SOBRE NOSOTROS',
    '/curiosities': 'CURIOSIDADES',
    '/quiz': 'QUIZ',
};

export function getRouteTitle(pathname: string): string {
    return routeTitles[pathname] ?? pathname;
}