/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../auth/authStore';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const { token } = useAuthStore();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert('Failed to fetch projects', error);
      });
  }, []);

  return (
    <ul tw="divide-y divide-gray-100">
      {projects.map((project) => (
        <Link
          to={`/ide/${project.projectId}`}
          key={project.projectId}
          tw="flex justify-center gap-x-7 py-5"
        >
          <div tw="flex min-w-0 gap-x-4">
            <div tw="min-w-0 flex-auto">
              <p tw="text-lg font-semibold leading-6 text-sky-900">
                {project.projectName}
              </p>
              <p tw="mt-1 truncate text-base leading-5 text-sky-500">
                {project.projectLang}
              </p>
            </div>
          </div>
          <div tw="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p tw="text-sm leading-6 text-sky-900">{}</p>

            <p tw="mt-1 text-xs leading-5 text-sky-500">
              Created on{' '}
              <time dateTime={project.regDate}>{project.regDate}</time>
            </p>
          </div>
        </Link>
      ))}
    </ul>
  );
}

export default ProjectList;
