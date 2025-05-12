// src/config/routes.ts

export const routes = {
    home: '/',
    aboutUs: '/about-us',
    curiosities: '/curiosities',
    gary: '/personal-diseases/gdtm',
    viedman: '/personal-diseases/jsvr',
    hurtado: '/personal-diseases/smh',
    brandon: '/personal-diseases/hbvc',
    quiz: '/quiz',
};


export const routeTitles: Record<string, string> = {
    '/personal-diseases/jsvr': 'TRAUMA ABDOMINAL',
    '/personal-diseases/hbvc': 'TROMBOSIS ESPLÉNICA',
    '/personal-diseases/smh': 'QUISTES ESPLÉNICOS',
    '/personal-diseases/gdtm': 'INFARTO ESPLÉNICO',
    '/about-us': 'SOBRE NOSOTROS',
    '/curiosities': 'CURIOSIDADES',
    '/quiz': 'QUIZ',
};

export function getRouteTitle(pathname: string): string {
    return routeTitles[pathname] ?? pathname;
}