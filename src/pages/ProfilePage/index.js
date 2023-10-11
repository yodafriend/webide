import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuthStore from '../../auth/authStore';

function CreateProject() {
    const router = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [projectLang, setProjectLang] = useState('');
    const [error, setError] = useState(null);
    const { token, setProjectId} = useAuthStore();

    const handleProjectNameChange =(e)=>{
        setProjectName(e.target.value);
    }
    const handleProjectLangChange =(e)=>{
        setProjectLang(e.target.value);
    }
    
const handleCreate = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/projects', {
            projectName,
            projectLang,
        },  
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201) {                 
            console.log('Project created:', response.data);
            setProjectId(response.data.projectId);
            router('/')
        }
    } catch (err) {
        console.error('Error creating project:', err);
        setError('프로젝트 생성 중 오류가 발생했습니다.');
    }
}
    return (
        <div>
            <h2>프로젝트를 생성하시겠습니까?</h2>
            <div>
                <input
                    type="text"
                    placeholder="프로젝트 이름"
                    value={projectName}
                    onChange={handleProjectNameChange}
                />
                <input
                    type="text"
                    placeholder="프로젝트 설명"
                    value={projectLang}
                    onChange={handleProjectLangChange}
                />
                <button type='button' onClick={handleCreate}>프로젝트 생성</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

        </div>
    );
}

export default CreateProject;