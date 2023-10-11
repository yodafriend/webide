/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { useState, Fragment, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import useAuthStore from '../../auth/authStore';
import WebTerminal from '../../components/WebTerminal';
import ChatPage from '../../components/Chat';
// import useAuthStore from '../../auth/authStore';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const userNavigation = [
  { name: '프로필', href: '/profile' },
  { name: '로그아웃', href: '/#' },
];

export default function IdePage() {
  const { projectId } = useParams();
  const { token } = useAuthStore();
  const [isRunning, setIsRunning] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    const startProject = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/projects/${projectId}/run`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer 토큰 방식을 사용합니다.
            },
          },
        );
        if (response.data === 'ok') {
          setIsRunning(true);
        }
      } catch (error) {
        console.error('Error:', error); // 오류 발생 시 콘솔에 오류를 출력합니다.
        if (error.response) {
          // 서버로부터 응답이 있었다면 응답 내용을 출력합니다.
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
    };

    startProject(); // fetchData 함수를 호출합니다.

    // return () => {
    //   const stopProject = async () => {
    //     try {
    //       const response = await axios.post(
    //         `http://localhost:8080/api/v1/projects/${projectId}/stop`,
    //         {},
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`, // Bearer 토큰 방식을 사용합니다.
    //             'Content-Type': 'application/json',
    //           },
    //         },
    //       );
    //       console.log('Success:', response.data); // 성공 시 응답 데이터를 콘솔에 출력합니다.
    //     } catch (error) {
    //       console.error('Error:', error); // 오류 발생 시 콘솔에 오류를 출력합니다.
    //       if (error.response) {
    //         // 서버로부터 응답이 있었다면 응답 내용을 출력합니다.
    //         console.error('Response data:', error.response.data);
    //         console.error('Response status:', error.response.status);
    //       }
    //     }
    //   };
    //   stopProject();
    //   console.log('stop project');
    // };
  }, [projectId]);

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
                      <img tw="h-8 w-8" src="../logo.png" alt="Your Company" />
                    </a>
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
              <div tw="space-y-1 px-2 pb-3 pt-2 sm:px-3">dls</div>
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
            {state.projectName}
          </h1>
        </div>
      </header>
      <main>
        <div tw="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {isRunning && <WebTerminal projectId={projectId} />}
        </div>
        <div tw="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
          <ChatPage projectId={projectId} projectName={state.projectName} />
        </div>
      </main>
    </div>
  );
}
