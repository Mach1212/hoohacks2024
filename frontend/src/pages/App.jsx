import { Navigate, Route, Routes } from 'react-router-dom';
import Overview from './Overview.jsx';
import Calculator from './Calculator.jsx';
import Flow from './custom_nodes.jsx';
import AllControls from './controls.jsx';
import Formula from './CreateFormula.jsx';

export default function App() {
  return (
    <div className='bg-[background] w-screen h-screen'>
      <Routes>
        <Route path='/' element={<Navigate to='/calculator' />} />
        {/*<Route path='/overview' element={<Overview />} />*/}
        <Route path='/calculator' element={<Calculator />} />
        {/*<Route path='/controls' element={<AllControls />} />*/}
        {/*<Route path='/flow' element={<Flow />} />*/}
        {/*<Route path='/formula' element={<Formula />} />*/}
      </Routes>
    </div>
  );
}
