import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/add' element={<CreateCourse />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
