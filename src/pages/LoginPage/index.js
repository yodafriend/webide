/** @jsxImportSource @emotion/react */
import 'twin.macro';
import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuthStore from '../../auth/authStore';

export default function LoginPage() {
  const router = useNavigate();
  const login = useAuthStore((state)=>state.login);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    axios
        .get('http://localhost:8080/api/v1/auth/csrf')
        .then((response) => {
            console.log("api response",response);
            if (response.data) {
                window.sessionStorage.setItem(response.config.xsrfCookieName, response.data);
                axios.defaults.headers.common[response.config.xsrfHeaderName] = response.data;

                useAuthStore.setState({csrfToken: response.data})
              }
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
            alert('Failed to fetch CSRF token');
        });
}, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', credentials );
      const { token} = response.data;
      login(token,credentials.email);
      console.log(token,login)
      alert("로그인 되었습니다.");
      router('/');
    } catch (error) {
      alert("이메일 및 비밀번호 오류")
    }
  };


    return (
    <div tw="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div tw="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <span tw="sr-only">Our Jinro</span>
          <img tw="mx-auto h-12 w-auto" src="../../logo.png" alt="" />
        </a>
        <h2 tw="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div tw="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} tw="space-y-6">
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
                  value={credentials.email}
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </label>
          </div>

          <div>
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
                    value={credentials.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              tw="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Login
            </button>
          </div>
        </form>
        <div tw="text-sm text-center py-3">
          <a href="/forgot" tw="font-semibold text-sky-600 hover:text-sky-500 ">
            비밀번호 찾기
          </a>
        </div>
        <p tw="mt-5 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            href="/signup"
            tw="font-semibold leading-6 text-sky-600 hover:text-sky-500"
          >
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}