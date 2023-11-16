import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import EditCourse from './components/EditCourse/EditCourse';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='*' element={<Navigate to='/login' />} />
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />

					<Route
						path='/courses'
						element={<PrivateRoute allowedRoles={['user', 'admin']} />}
					>
						<Route path='/courses' element={<Courses />} />
					</Route>

					<Route
						path='/courses/:courseId'
						element={<PrivateRoute allowedRoles={['user', 'admin']} />}
					>
						<Route path='/courses/:courseId' element={<CourseInfo />} />
					</Route>

					<Route
						path='/courses/add'
						element={<PrivateRoute allowedRoles={['admin']} />}
					>
						<Route path='/courses/add' element={<CreateCourse />} />
					</Route>

					<Route
						path='/courses/update/:courseId'
						element={<PrivateRoute allowedRoles={['admin']} />}
					>
						<Route path='/courses/update/:courseId' element={<EditCourse />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
