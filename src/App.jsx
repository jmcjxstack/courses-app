import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
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

					<Route exact path='/courses' element={<PrivateRoute />}>
						<Route exact path='/courses' element={<Courses />} />
					</Route>

					<Route exact path='/courses/add' element={<PrivateRoute />}>
						<Route exact path='/courses/add' element={<CreateCourse />} />
					</Route>

					<Route exact path='/courses/:courseId' element={<PrivateRoute />}>
						<Route exact path='/courses/:courseId' element={<CourseInfo />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
