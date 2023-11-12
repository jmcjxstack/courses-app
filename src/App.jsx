import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';

import { mockedCoursesList, mockedAuthorsList } from './constants';

export default function App() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem('isLoggedIn')
	);

	return (
		<>
			<BrowserRouter>
				<Header
					isAuthenticated={isAuthenticated}
					setIsAuthenticated={(state) => setIsAuthenticated(state)}
				/>
				<Routes>
					<Route path='*' element={<Navigate to='/login' />} />
					<Route
						path='/login'
						element={
							<Login
								isAuthenticated={isAuthenticated}
								setIsAuthenticated={(state) => setIsAuthenticated(state)}
							/>
						}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route
						path='/courses'
						element={isAuthenticated ? <Courses /> : <Navigate to='/login' />}
					/>
					<Route
						path='/courses/add'
						element={
							isAuthenticated ? (
								<CreateCourse
									authors={authors}
									courses={courses}
									setAuthors={(state) => setAuthors(state)}
									setCourses={(state) => setCourses(state)}
								/>
							) : (
								<Navigate to='/login' />
							)
						}
					/>
					<Route
						path='/courses/:courseId'
						element={
							isAuthenticated ? <CourseInfo /> : <Navigate to='/login' />
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
