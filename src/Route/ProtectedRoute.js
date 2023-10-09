import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';


export default function ProtectedRoute ({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // 인증되지 않은 경우 로그인 페이지로 리다이렉트
        return <Navigate to="/" />;
    }

    // 인증된 경우 해당 라우트의 컴포넌트를 렌더링
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
