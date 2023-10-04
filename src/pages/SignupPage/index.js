/** @jsxImportSource @emotion/react */
import 'twin.macro';

export default function SingupPage() {
  return (
    <div tw="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div tw="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <span tw="sr-only">Our Jinro</span>
          <img tw="mx-auto h-12 w-auto" src="../../logo.png" alt="" />
        </a>
        <h2 tw="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Join OurRealRoad
        </h2>
      </div>

      <div tw="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form tw="space-y-4" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              tw="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
              <div tw="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </label>
          </div>

          <div>
            <label
              htmlFor="password"
              tw="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
              <div tw="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </label>
          </div>

          <div>
            <label
              htmlFor="password_confirm"
              tw="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
              <div tw="mt-2">
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type="password"
                  autoComplete="current-password"
                  required
                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </label>
          </div>

          <div>
            <label
              htmlFor="name"
              tw="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
              <div tw="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </label>
          </div>

          <div>
            <button
              type="submit"
              tw="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p tw="mt-10 text-center text-sm text-gray-500">
          이미 계정이 있으세요?{' '}
          <a
            href="/login"
            tw="font-semibold leading-6 text-sky-600 hover:text-sky-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
