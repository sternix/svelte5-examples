import { Google, Home, Packages, Teaching } from '../icons';

export const sidebarData = [
    {
        stringSection: 'PAGES:',
        arrayMenus: [
            {
                stringText: 'HOME',
                stringHref: '/',
                stringIcon: Home,
                stringName: 'menuHome',
            },
            {
                stringText: 'TEACHING',
                stringIcon: Teaching,
                arraySubmenus: [
                    {
                        stringText: 'COURSES',
                        stringHref: 'courses',
                        stringName: 'menuCourses',
                        stringBadge: 'NOVO',
                    },
                    {
                        stringText: 'ARTICLES',
                        stringHref: '/articles',
                        stringName: 'menuArticles',
                    },
                ],
                stringName: 'menuTeaching',
            },
            {
                stringName: 'menuPackages',
                stringIcon: Packages,
                stringText: 'PACKAGES',
                stringHref: '/packages',
            },
        ],
    },
    {
        stringSection: 'LINKS:',
        arrayMenus: [
            {
                stringName: 'menuGoogle',
                stringText: 'GOOGLE',
                stringHref: 'http://www.google.com.br',
                stringIcon: Google,
                stringTarget: '_blank',
                stringBadge: 'NOVO',
            },
        ],
    },
];