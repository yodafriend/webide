/** @jsxImportSource @emotion/react */
/* eslint-disable */
import 'twin.macro';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useAuthStore from './auth/authStore';
import { AuthProvider } from './auth/AuthContext';
import axios from 'axios';
import ProjectList from './component/ProjectList';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { email, logout, isAuthenticated } = useAuthStore();
  console.log('isAuthenticated : ', isAuthenticated);
  const username = email.split('@')[0];

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/auth/csrf')
      .then((response) => {
        console.log(response);
        if (response.data) {
          window.sessionStorage.setItem(
            response.config.xsrfCookieName,
            response.data,
          );
          axios.defaults.headers.common[response.config.xsrfHeaderName] =
            response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to fetch CSRF token');
      });
  }, []);

  return (
    <div tw="bg-white">
      <header tw="absolute inset-x-0 top-0 z-50">
        <nav
          tw="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div tw="flex lg:flex-1">
            <a href="/" tw="-m-1.5 p-1.5">
              <span tw="sr-only">Our Jinro</span>
              <img tw="h-8 w-auto" src="logo.png" alt="" />
            </a>
          </div>
          <div tw="flex lg:hidden">
            <button
              type="button"
              tw="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span tw="sr-only">Open main menu</span>
              <Bars3Icon tw="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div tw="hidden lg:flex lg:flex-1 lg:justify-end">
            {isAuthenticated ? (
              <>
                <span tw="text-sm font-semibold leading-6 text-gray-900 mr-5">
                  {username}님 환영합니다!
                </span>
                <button
                  onClick={logout}
                  tw="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <a
                  href="/signup"
                  tw="text-sm font-semibold leading-6 text-gray-900 mr-5"
                >
                  Sign Up
                </a>
                <a
                  href="/login"
                  tw="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in
                </a>
              </>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          tw="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div tw="fixed inset-0 z-50" />
          <Dialog.Panel tw="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div tw="flex items-center justify-between">
              <a href="/" tw="-m-1.5 p-1.5">
                <span tw="sr-only">Our Jinro</span>
                <img tw="h-8 w-auto" src="logo.png" alt="" />
              </a>
              <button
                type="button"
                tw="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span tw="sr-only">Close menu</span>
                <XMarkIcon tw="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div tw="mt-6 flow-root">
              <div tw="-my-6 divide-y divide-gray-500/10">
                <div tw="py-6">
                  {isAuthenticated ? (
                    <>
                      <span tw="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900">
                        {username}님 환영합니다!
                      </span>
                      <button
                        onClick={logout}
                        tw="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        tw="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </a>
                      <a
                        href="/signup"
                        tw="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Sign up
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div tw="relative isolate px-6 pt-14 lg:px-8">
        <div
          tw="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            tw="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#DEF0FA] to-[#005BAC] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {isAuthenticated ? (
          // 로그인 되어 있을 때 화면
          <div tw="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div tw="text-center">
              <h1 tw="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                프로젝트 목록
              </h1>
              <ProjectList />
            </div>
          </div>
        ) : (
          // 로그인 되어 있지 않을 때 화면
          <div tw="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div tw="text-center">
              <h1 tw="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Make your Code
              </h1>
              <p tw="mt-6 text-lg leading-8 text-gray-600">
                깔끔한 코드 작성을 도와주는 Web IDE
              </p>
              <div tw="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/signup"
                  tw="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        )}

        <div
          tw="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            tw="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#DEF0FA] to-[#005BAC] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
