/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { Fragment, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import useAuthStore from '../auth/authStore';

export default function CreateProject({ isOpen, onClose }) {
  const cancelButtonRef = useRef(null);
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [projectLang, setProjectLang] = useState('');

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };
  const handleLangChange = (e) => {
    setProjectLang(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://localhost:8080/api/v1/projects',
        {
          projectName,
          projectLang,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰 방식을 사용합니다.
          },
        },
      )
      .then((response) => {
        if (response.status === 201) {
          alert('프로젝트가 생성되었습니다.');
          onClose();
          navigate('/');
        }
      })
      .catch((error) => {
        alert('Failed make project', error);
      });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        tw="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div tw="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div tw="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div tw="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel tw="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div tw="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pb-4">
                  <div tw="sm:flex sm:items-start">
                    <div tw="text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <div tw="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div tw="space-y-3">
                          <div>
                            <label
                              htmlFor="name"
                              tw="block text-sm font-medium leading-6 text-gray-900"
                            >
                              프로젝트 이름
                              <div tw="mt-2">
                                <input
                                  id="name"
                                  name="name"
                                  type="text"
                                  value={projectName}
                                  onChange={handleNameChange}
                                  required
                                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </label>
                          </div>

                          <div>
                            <div>
                              <label
                                htmlFor="language"
                                tw="block text-sm font-medium leading-6 text-gray-900"
                              >
                                사용 언어
                                <div tw="mt-2">
                                  <input
                                    id="language"
                                    name="language"
                                    value={projectLang}
                                    onChange={handleLangChange}
                                    required
                                    tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div tw="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    tw="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    프로젝트 만들기
                  </button>
                  <button
                    type="button"
                    tw="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

CreateProject.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
