import { Navigate, Route, Routes } from 'react-router-dom';
import Overview from './Overview.jsx';

export default function App() {
  return (
    <div className='px-2'>
      <Routes>
        <Route path='/' element={<Navigate to='/overview' />} />
        <Route path='/overview' element={<Overview />} />
      </Routes>
    </div>
  );
}
