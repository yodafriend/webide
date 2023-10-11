/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../auth/authStore';
import CreateProjectModal from './CreateProject';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        alert('Failed to fetch projects', error);
        if (error.response.status === 401) {
          alert('로그인이 필요합니다.');
          logout();
          navigate('/login');
        }
      });
  }, []);

  return (
    <>
      <ul tw="divide-y divide-sky-100">
        {projects.map((project) => (
          <Link
            to={`/ide/${project.projectId}`}
            state={{ projectName: project.projectName }}
            key={project.projectId}
            tw="flex gap-x-7 py-5 justify-center"
          >
            <div tw="min-w-0 gap-x-4 border-solid rounded-lg border-2 border-sky-600 px-10 py-5">
              <div tw="min-w-0 flex-auto">
                <p tw="text-lg font-semibold leading-6 text-sky-900">
                  {project.projectName}
                </p>
                <p tw="mt-1 truncate text-base leading-5 text-sky-500">
                  {project.projectLang}
                </p>
                <p tw="mt-1 text-xs leading-5 text-sky-500">
                  Created on{' '}
                  <time dateTime={project.regDate}>{project.regDate}</time>
                </p>
              </div>
            </div>
          </Link>
        ))}
        <div tw=" py-5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            tw="min-w-0 w-48 border-solid rounded-lg border-2 px-10 py-5 min-w-0 text-lg font-semibold border-sky-600 text-sky-900 "
          >
            +
          </button>
        </div>
      </ul>

      <CreateProjectModal isOpen={open} onClose={handleCloseModal} />
    </>
  );
}

export default ProjectList;
