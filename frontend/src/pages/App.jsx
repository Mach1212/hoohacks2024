import { Navigate, Route, Routes } from 'react-router-dom';
import Overview from './Overview.jsx';
import Calculator from './Calculator.jsx';

export default function App() {
  return (
    <div className='bg-[background] w-screen h-screen'>
      <Routes>
        <Route path='/' element={<Navigate to='/overview' />} />
        <Route path='/overview' element={<Overview />} />
        <Route path='/calculator' element={<Calculator />} />
      </Routes>
    </div>
  );
}
