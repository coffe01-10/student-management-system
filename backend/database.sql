-- 数据库创建
CREATE DATABASE IF NOT EXISTS student_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE student_management;
SET NAMES 'utf8mb4';

-- 1. 创建所有表结构 --

-- 用户表 (统一登录认证)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- 存储加密后的密码
    role ENUM('admin', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT='统一用户认证表';

-- 管理员表
CREATE TABLE IF NOT EXISTS administrators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) COMMENT='管理员信息表';

-- 学生表
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    student_id VARCHAR(50) NOT NULL UNIQUE COMMENT '学号',
    full_name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    date_of_birth DATE,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    address TEXT,
    enrollment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) COMMENT='学生基本信息表';

-- 课程表
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(50) NOT NULL UNIQUE,
    course_name VARCHAR(255) NOT NULL,
    description TEXT,
    credits INT NOT NULL
) COMMENT='课程信息表';

-- 成绩表
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    score DECIMAL(5, 2) NOT NULL,
    grade_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) COMMENT='学生成绩表';

-- 选课表
CREATE TABLE IF NOT EXISTS course_selections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    selection_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) COMMENT='学生选课记录表';

-- 2. 插入所有数据 --

-- 插入默认管理员账户 (密码: admin123)
INSERT INTO users (username, password, role) 
SELECT 'admin', '$2a$10$px4aAPx9GM2LEnIBo3ZxeO2COy0GGbUeepAQM0MXrGqv2FYUKZRpq', 'admin' 
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

-- 关联管理员信息
INSERT INTO administrators (user_id, full_name, email)
SELECT id, '默认管理员', 'admin@example.com'
FROM users WHERE username = 'admin' AND NOT EXISTS (SELECT 1 FROM administrators WHERE user_id = (SELECT id FROM users WHERE username = 'admin'));

-- 插入示例课程
INSERT INTO courses (course_code, course_name, description, credits) VALUES
('CS101', '计算机科学导论', '介绍计算机科学的基本概念。', 3),
('MA201', '高等数学', '深入学习微积分和线性代数。', 4),
('PH101', '大学物理', '涵盖力学、电磁学和热力学。', 4);

-- 插入示例学生用户 (密码: student123, 用户名即学号)
INSERT INTO users (username, password, role) VALUES
('S001', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S002', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student');

-- 插入示例学生信息
INSERT INTO students (user_id, student_id, full_name, gender, date_of_birth, email, enrollment_date) VALUES
((SELECT id FROM users WHERE username = 'S001'), 'S001', '张三', 'Male', '2002-08-15', 'zhangsan@example.com', '2022-09-01'),
((SELECT id FROM users WHERE username = 'S002'), 'S002', '李四', 'Female', '2003-05-20', 'lisi@example.com', '2022-09-01');

-- 插入示例成绩
INSERT INTO grades (student_id, course_id, score, grade_date) VALUES
((SELECT id FROM students WHERE student_id = 'S001'), (SELECT id FROM courses WHERE course_code = 'CS101'), 85.50, '2023-01-15'),
((SELECT id FROM students WHERE student_id = 'S001'), (SELECT id FROM courses WHERE course_code = 'MA201'), 92.00, '2023-01-18'),
((SELECT id FROM students WHERE student_id = 'S002'), (SELECT id FROM courses WHERE course_code = 'CS101'), 88.00, '2023-01-15');

-- 插入40条随机学生用户 (用户名即学号) --
INSERT INTO users (username, password, role) VALUES
('S003', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S004', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S005', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S006', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S007', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S008', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S009', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S010', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S011', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S012', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S013', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S014', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S015', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S016', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S017', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S018', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S019', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S020', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S021', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S022', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S023', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S024', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S025', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S026', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S027', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S028', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S029', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S030', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S031', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S032', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S033', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S034', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S035', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S036', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S037', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S038', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S039', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S040', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S041', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student'),
('S042', '$2a$10$karwRBslUHHojcxxDQb0kOtxOQe7up3K22jNqad/ERotPpBvSxiUO', 'student');

-- 插入40条随机学生信息 --
INSERT INTO students (user_id, student_id, full_name, gender, date_of_birth, email, enrollment_date) VALUES
((SELECT id FROM users WHERE username = 'S003'), 'S003', '高鹏', 'Male', '2002-12-26', 's003@example.com', '2023-02-21'),
((SELECT id FROM users WHERE username = 'S004'), 'S004', '徐敏', 'Female', '2002-02-12', 's004@example.com', '2021-11-23'),
((SELECT id FROM users WHERE username = 'S005'), 'S005', '黄鹏', 'Male', '2003-04-27', 's005@example.com', '2022-10-25'),
((SELECT id FROM users WHERE username = 'S006'), 'S006', '吴强', 'Male', '2002-04-26', 's006@example.com', '2022-01-22'),
((SELECT id FROM users WHERE username = 'S007'), 'S007', '马波', 'Male', '2003-01-25', 's007@example.com', '2021-09-26'),
((SELECT id FROM users WHERE username = 'S008'), 'S008', '周芳', 'Female', '2003-04-03', 's008@example.com', '2021-12-29'),
((SELECT id FROM users WHERE username = 'S009'), 'S009', '林芬', 'Female', '2004-02-22', 's009@example.com', '2022-09-28'),
((SELECT id FROM users WHERE username = 'S010'), 'S010', '林强', 'Male', '2004-04-30', 's010@example.com', '2022-01-08'),
((SELECT id FROM users WHERE username = 'S011'), 'S011', '王军', 'Male', '2004-10-09', 's011@example.com', '2022-08-13'),
((SELECT id FROM users WHERE username = 'S012'), 'S012', '黄敏', 'Female', '2003-08-28', 's012@example.com', '2022-01-20'),
((SELECT id FROM users WHERE username = 'S013'), 'S013', '赵明', 'Male', '2002-06-02', 's013@example.com', '2022-10-21'),
((SELECT id FROM users WHERE username = 'S014'), 'S014', '周燕', 'Female', '2003-03-17', 's014@example.com', '2023-07-23'),
((SELECT id FROM users WHERE username = 'S015'), 'S015', '周芳', 'Female', '2002-05-06', 's015@example.com', '2021-11-09'),
((SELECT id FROM users WHERE username = 'S016'), 'S016', '黄芬', 'Female', '2002-02-02', 's016@example.com', '2021-11-17'),
((SELECT id FROM users WHERE username = 'S017'), 'S017', '赵艳', 'Female', '2003-12-09', 's017@example.com', '2021-09-29'),
((SELECT id FROM users WHERE username = 'S018'), 'S018', '赵勇', 'Male', '2004-04-03', 's018@example.com', '2023-07-14'),
((SELECT id FROM users WHERE username = 'S019'), 'S019', '徐杰', 'Male', '2001-03-09', 's019@example.com', '2023-08-14'),
((SELECT id FROM users WHERE username = 'S020'), 'S020', '林鹏', 'Male', '2004-10-20', 's020@example.com', '2022-12-31'),
((SELECT id FROM users WHERE username = 'S021'), 'S021', '张辉', 'Male', '2001-04-19', 's021@example.com', '2021-12-10'),
((SELECT id FROM users WHERE username = 'S022'), 'S022', '杨辉', 'Male', '2003-01-18', 's022@example.com', '2023-08-17'),
((SELECT id FROM users WHERE username = 'S023'), 'S023', '郭涛', 'Male', '2004-04-06', 's023@example.com', '2022-09-12'),
((SELECT id FROM users WHERE username = 'S024'), 'S024', '郭芳', 'Female', '2001-07-15', 's024@example.com', '2021-12-06'),
((SELECT id FROM users WHERE username = 'S025'), 'S025', '李娜', 'Female', '2002-08-11', 's025@example.com', '2022-11-28'),
((SELECT id FROM users WHERE username = 'S026'), 'S026', '徐超', 'Male', '2003-07-06', 's026@example.com', '2022-02-17'),
((SELECT id FROM users WHERE username = 'S027'), 'S027', '何桂英', 'Female', '2002-04-08', 's027@example.com', '2023-01-15'),
((SELECT id FROM users WHERE username = 'S028'), 'S028', '周桂英', 'Female', '2001-08-12', 's028@example.com', '2021-11-06'),
((SELECT id FROM users WHERE username = 'S029'), 'S029', '杨桂英', 'Female', '2001-09-29', 's029@example.com', '2022-01-19'),
((SELECT id FROM users WHERE username = 'S030'), 'S030', '李敏', 'Female', '2003-11-27', 's030@example.com', '2021-10-06'),
((SELECT id FROM users WHERE username = 'S031'), 'S031', '林平', 'Male', '2001-05-02', 's031@example.com', '2022-01-21'),
((SELECT id FROM users WHERE username = 'S032'), 'S032', '罗艳', 'Female', '2001-10-29', 's032@example.com', '2021-09-14'),
((SELECT id FROM users WHERE username = 'S033'), 'S033', '马磊', 'Male', '2003-02-04', 's033@example.com', '2022-10-21'),
((SELECT id FROM users WHERE username = 'S034'), 'S034', '吴燕', 'Female', '2004-04-14', 's034@example.com', '2022-08-17'),
((SELECT id FROM users WHERE username = 'S035'), 'S035', '杨萍', 'Female', '2001-10-05', 's035@example.com', '2023-04-05'),
((SELECT id FROM users WHERE username = 'S036'), 'S036', '刘涛', 'Male', '2001-07-03', 's036@example.com', '2022-04-02'),
((SELECT id FROM users WHERE username = 'S037'), 'S037', '黄萍', 'Female', '2002-12-11', 's037@example.com', '2021-12-10'),
((SELECT id FROM users WHERE username = 'S038'), 'S038', '林强', 'Male', '2001-04-01', 's038@example.com', '2022-08-07'),
((SELECT id FROM users WHERE username = 'S039'), 'S039', '马芬', 'Female', '2001-04-27', 's039@example.com', '2021-12-18'),
((SELECT id FROM users WHERE username = 'S040'), 'S040', '赵芬', 'Female', '2002-04-08', 's040@example.com', '2022-09-29'),
((SELECT id FROM users WHERE username = 'S041'), 'S041', '胡明', 'Male', '2003-06-17', 's041@example.com', '2023-07-06'),
((SELECT id FROM users WHERE username = 'S042'), 'S042', '罗芳', 'Female', '2004-11-07', 's042@example.com', '2022-09-02');