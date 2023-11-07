import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

import { mockedCoursesList, mockedAuthorsList } from './constants';

export default function App() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Navigate to='/login' />} />
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route
						path='/courses'
						element={<Courses courses={courses} authors={authors} />}
					/>
					<Route
						path='/courses/add'
						element={
							<CreateCourse
								authors={authors}
								courses={courses}
								setAuthors={(state) => setAuthors(state)}
								setCourses={(state) => setCourses(state)}
							/>
						}
					/>
					<Route
						path='/courses/:courseId'
						element={<CourseInfo authors={authors} courses={courses} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
