import React, { useState, useEffect } from 'react';

/**
 * @function GradePage
 * @description 成绩管理页面
 * @returns {JSX.Element}
 */
const GradePage = () => {
        const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null); // Track which grade is being edited
    const [currentGrade, setCurrentGrade] = useState(''); // Track the grade value while editing

    useEffect(() => {
        fetchGrades();
    }, []);

    /**
     * @function fetchGrades
     * @description Fetches the list of grades from the server.
     */
    const fetchGrades = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/grades', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setGrades(data);
            } else {
                setError('获取成绩列表失败');
            }
        } catch (error) {
            setError('获取成绩列表失败，请检查网络连接');
        } finally {
            setLoading(false);
        }
    };

    /**
     * @function handleEdit
     * @description Enables editing mode for a specific grade.
     * @param {object} grade - The grade to edit.
     */
        const handleEdit = (grade) => {
        setEditMode(grade.id);
        setCurrentGrade(grade.grade ?? ''); // Use nullish coalescing operator to avoid uncontrolled to controlled warning
    };

    /**
     * @function handleCancel
     * @description Cancels editing mode.
     */
    const handleCancel = () => {
        setEditMode(null);
        setCurrentGrade('');
    };

    /**
     * @function handleSave
     * @description Saves the updated grade to the server.
     * @param {number} id - The ID of the grade to save.
     */
    const handleSave = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/grades/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ grade: currentGrade })
                }
            );

            if (response.ok) {
                setEditMode(null);
                setCurrentGrade('');
                fetchGrades(); // Refresh grades after saving
            } else {
                setError('更新成绩失败');
            }
        } catch (error) {
            setError('更新成绩失败，请检查网络连接');
        }
    };

    if (loading) {
        return <div>正在加载...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>成绩管理</h2>
            {grades.length === 0 ? (
                <p style={{ textAlign: 'center' }}>暂无成绩记录</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>学生ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>课程ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>成绩</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(grade => (
                            <tr key={grade.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '12px' }}>{grade.id}</td>
                                <td style={{ padding: '12px' }}>{grade.student_id}</td>
                                <td style={{ padding: '12px' }}>{grade.course_id}</td>
                                <td style={{ padding: '12px' }}>
                                    {editMode === grade.id ? (
                                        <input
                                            type="number"
                                            value={currentGrade}
                                            onChange={(e) => setCurrentGrade(e.target.value)}
                                            style={{ width: '60px' }}
                                        />
                                    ) : (
                                        grade.grade
                                    )}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {editMode === grade.id ? (
                                        <>
                                            <button onClick={() => handleSave(grade.id)} style={{ marginRight: '8px', padding: '6px 12px', cursor: 'pointer' }}>保存</button>
                                            <button onClick={handleCancel} style={{ padding: '6px 12px', cursor: 'pointer' }}>取消</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(grade)} style={{ marginRight: '8px', padding: '6px 12px', cursor: 'pointer' }}>编辑</button>
                                            <button style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none' }}>删除</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GradePage;