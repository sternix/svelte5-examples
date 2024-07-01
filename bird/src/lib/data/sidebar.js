import { Google, Home, Packages, Teaching } from '../icons';

export const sidebarData = [
    {
        stringSection: 'Pages:',
        arrayMenus: [
            {
                stringText: 'Home',
                stringHref: '/',
                stringIcon: Home,
                stringName: 'menuHome',
            },
            {
                stringText: 'Teaching',
                stringIcon: Teaching,
                arraySubmenus: [
                    {
                        stringText: 'Courses',
                        stringHref: 'courses',
                        stringName: 'menuCourses',
                        stringBadge: 'New',
                    },
                    {
                        stringText: 'Articles',
                        stringHref: '/articles',
                        stringName: 'menuArticles',
                    },
                ],
                stringName: 'menuTeaching',
            },
            {
                stringName: 'menuPackages',
                stringIcon: Packages,
                stringText: 'Packages',
                stringHref: '/packages',
            },
        ],
    },
    {
        stringSection: 'Links:',
        arrayMenus: [
            {
                stringName: 'menuGoogle',
                stringText: 'Google',
                stringHref: 'http://www.google.com',
                stringIcon: Google,
                stringTarget: '_blank',
                stringBadge: 'New',
            },
        ],
    },
];