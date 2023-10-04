/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];
const userNavigation = [
  { name: '프로필', href: '/profile' },
  { name: '설정', href: '#' },
  { name: '로그아웃', href: '#' },
];

export default function IdePage() {
  return (
    <div tw="min-h-full">
      <Disclosure as="nav" tw="bg-sky-700">
        {({ open }) => (
          <>
            <div tw="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div tw="flex h-16 items-center justify-between">
                <div tw="flex items-center">
                  <div tw="flex-shrink-0">
                    <a href="/">
                      <img tw="h-8 w-8" src="logo.png" alt="Your Company" />
                    </a>
                  </div>
                  <div tw="hidden md:block">
                    <div tw="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => {
                        if (item.current) {
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              tw="bg-sky-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          );
                        }
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            tw="text-sky-300 hover:bg-sky-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div tw="hidden md:block">
                  <div tw="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" tw="relative ml-3">
                      <div>
                        <Menu.Button tw="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span tw="absolute -inset-1.5" />
                          <span tw="sr-only">Open user menu</span>
                          <img
                            tw="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items tw="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => {
                                if (active) {
                                  return (
                                    <a
                                      href={item.href}
                                      tw="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                    >
                                      {item.name}
                                    </a>
                                  );
                                }
                                return (
                                  <a
                                    href={item.href}
                                    tw="block px-4 py-2 text-sm text-gray-700"
                                  >
                                    {item.name}
                                  </a>
                                );
                              }}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div tw="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button tw="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span tw="absolute -inset-0.5" />
                    <span tw="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon tw="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon tw="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel tw="md:hidden">
              <div tw="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => {
                  if (item.current) {
                    return (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        tw="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    );
                  }
                  return (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      tw="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
              <div tw="border-t border-gray-700 pb-3 pt-4">
                <div tw="flex items-center px-5">
                  <div tw="flex-shrink-0">
                    <img
                      tw="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div tw="ml-3">
                    <div tw="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div tw="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    tw="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span tw="absolute -inset-1.5" />
                    <span tw="sr-only">View notifications</span>
                    <BellIcon tw="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div tw="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      tw="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header tw="bg-white shadow">
        <div tw="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 tw="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div tw="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        </div>
      </main>
    </div>
  );
}
