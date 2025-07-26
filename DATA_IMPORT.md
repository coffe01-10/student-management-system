# 数据导入指南

## 数据库设置

1.  **创建数据库**: 首先，你需要一个 MySQL 数据库。你可以使用 `database.sql` 文件来创建名为 `student_management` 的数据库。

    ```sql
    CREATE DATABASE IF NOT EXISTS student_management;
    USE student_management;
    ```

2.  **创建表**: 使用 `database.sql` 文件中的其余部分来创建所需的表：`users`, `students`, `courses`, `grades`, `course_selections`。

## 示例数据

你可以向这些表中插入示例数据，以便测试应用程序。

### `users` 表

`users` 表存储管理员和学生的登录信息。

*   **管理员示例**: 

    ```sql
    -- 创建 admin 用户，密码为 admin123
    -- 注意：这里的密码是明文，在实际应用中，后端会对密码进行哈希处理
    INSERT INTO users (username, password, role) VALUES ('admin', '$2a$10$E.V24C5pZ9v1j9SgSj2yBuT/Gz6D.8a.b.c.d.e.f', 'admin');
    ```

*   **学生示例**:

    ```sql
    INSERT INTO users (username, password, role) VALUES ('student1', 'hashed_password_for_student1', 'student');
    INSERT INTO users (username, password, role) VALUES ('student2', 'hashed_password_for_student2', 'student');
    ```

    **注意**: 密码应该是经过哈希处理的。在 `backend/src/controllers/authController.js` 中，应用程序使用 `bcryptjs` 进行密码哈希。

### `students` 表

`students` 表存储学生的个人信息。

```sql
INSERT INTO students (name, user_id) VALUES ('张三', 2);
INSERT INTO students (name, user_id) VALUES ('李四', 3);
```

### `courses` 表

`courses` 表存储课程信息。

```sql
INSERT INTO courses (name, description) VALUES ('数学', '基础数学课程');
INSERT INTO courses (name, description) VALUES ('英语', '大学英语课程');
```

### `grades` 表

`grades` 表存储学生的成绩。

```sql
-- 假设张三（student_id=1）的数学（course_id=1）成绩为90
INSERT INTO grades (student_id, course_id, grade) VALUES (1, 1, 90);

-- 假设李四（student_id=2）的英语（course_id=2）成绩为85
INSERT INTO grades (student_id, course_id, grade) VALUES (2, 2, 85);
```

### `course_selections` 表

`course_selections` 表记录学生的选课情况。

```sql
-- 假设张三（student_id=1）选择了数学（course_id=1）
INSERT INTO course_selections (student_id, course_id) VALUES (1, 1);

-- 假设李四（student_id=2）选择了英语（course_id=2）
INSERT INTO course_selections (student_id, course_id) VALUES (2, 2);
```

## 登录信息

### 管理员

*   **用户名**: `admin`
*   **密码**: `admin123`

### 学生

*   **用户名**: `student1`, `student2`, 等
*   **密码**: `123456`

## 操作细节

1.  **登录**: 
    *   打开应用程序的登录页面。
    *   输入上述提供的用户名和密码。
    *   管理员和学生将根据其角色被重定向到相应的仪表板。

2.  **密码哈希**: 
    *   在注册或更新密码时，后端使用 `bcryptjs` 自动对密码进行哈希处理。您无需手动哈希密码。

## 如何执行 SQL

你可以使用任何 MySQL 客户端（如 MySQL Workbench, DataGrip, or the `mysql` command-line client）来执行这些 SQL 语句。

1.  连接到你的 MySQL 服务器。
2.  选择 `student_management` 数据库。
3.  复制并粘贴上面的 SQL 代码来插入数据。