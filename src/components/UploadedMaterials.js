import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadedMaterials.css';

// Static data for demonstration
const materials = [
    {
        id: 1,
        title: 'Calculus Question Bank.pdf',
        uploadDate: '2024-05-20',
        questions: 247,
        icon: 'pdf',
        status: 'Analyzed'
    },
    {
        id: 2,
        title: 'Linear Algebra Notes.docx',
        uploadDate: '2024-05-18',
        questions: 152,
        icon: 'docx',
        status: 'Analyzed'
    },
    {
        id: 3,
        title: 'Statistics Formulas.txt',
        uploadDate: '2024-05-15',
        questions: 89,
        icon: 'txt',
        status: 'Analyzed'
    }
];

const FileIcon = ({ type }) => {
    const icons = {
        pdf: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>,
        docx: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6H9v6H7.5l5 5 5-5H12z"></path></svg>,
        txt: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    };
    const colors = {
        pdf: 'red',
        docx: 'blue',
        txt: 'gray'
    };
    return <div className={`material-file-icon ${colors[type]}`}>{icons[type]}</div>;
};

const UploadedMaterials = () => {
    const navigate = useNavigate();

    const handleContinueLearning = () => {
        navigate('/learn');
    };

    return (
        <div className="materials-container">
            <div className="materials-header">
                <h1>Uploaded Materials</h1>
                <p>Review your documents and continue your learning journey.</p>
            </div>
            <div className="materials-grid">
                {materials.map(material => (
                    <div key={material.id} className="material-card">
                        <FileIcon type={material.icon} />
                        <div className="material-details">
                            <h3 className="material-title">{material.title}</h3>
                            <div className="material-meta">
                                <span>Uploaded: {material.uploadDate}</span>
                                <span>{material.questions} Questions</span>
                            </div>
                        </div>
                        <div className="material-actions">
                             <span className="material-status">{material.status}</span>
                             <button className="continue-learning-btn" onClick={handleContinueLearning}>
                                Continue Learning
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadedMaterials;