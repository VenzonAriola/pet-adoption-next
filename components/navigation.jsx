'use client';
import React from 'react';

import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const links = [
  {
    title: 'Pets',
    href: '/pets',
    subLinks: [
      { title: 'All Pets', description: 'View all available pets' },
      { title: 'Dogs', description: 'View available dogs for adoption' },
      { title: 'Cats', description: 'View available cats for adoption' },
    ],
  },
  {
    title: 'Adopt',
    href: '/adopt',
    subLinks: [
      {
        title: 'How to Adopt',
        description: 'Step by step guide on how to adopt a pet',
      },
      {
        title: 'Adoption Application',
        description: 'Fill out an application to adopt a pet',
      },
      {
        title: 'Track Application',
        description: 'Track the status of your adoption application',
      },
    ],
  },
  {
    title: 'Re-home Pet',
    href: '/rehome',
    subLinks: [
      {
        title: 'Post a Pet for Adoption',
        description: 'Create a listing to re-home your pet',
      },
      {
        title: 'Manage Listings',
        description: 'Edit or remove existing pet adoption listings',
      },
    ],
  },
  {
    title: 'Resources',
    href: '/resources',
    subLinks: [
      {
        title: 'Pet Care Tips',
        description: 'Tips and advice for pet care and well-being',
      },
      {
        title: 'Adoption Guide',
        description: 'Comprehensive guide to the pet adoption process',
      },
      {
        title: 'FAQ',
        description: 'Frequently asked questions about pet adoption',
      },
    ],
  },
  {
    title: 'Support Us',
    href: '/support',
    subLinks: [
      { title: 'Donate', description: 'Support us with a donation' },
      { title: 'Wishlist', description: 'View our wishlist for items needed' },
      {
        title: 'Volunteer',
        description: 'Learn about volunteering opportunities',
      },
      { title: 'Events', description: 'Check out upcoming fundraising events' },
    ],
  },
];

export const Navigation = () => {
  return (
    <nav className='fixed left-1/2 z-50 mx-auto flex h-[120px] w-full max-w-screen-2xl -translate-x-1/2 transform items-center justify-between'>
      <div>Logo</div>

      <NavigationMenu>
        <NavigationMenuList className='flex gap-20'>
          {links.map(({ title, subLinks }) => (
            <NavigationMenuItem key={title}>
              <NavigationMenuTrigger className='bg-transparent text-lg'>
                {title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-8 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                  {subLinks.map((subLink) => (
                    <ListItem
                      key={subLink.title}
                      href={subLink.title.toLowerCase().split(' ').join('-')}
                      title={subLink.title}
                    >
                      {subLink.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
