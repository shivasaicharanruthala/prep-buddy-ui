import * as React from "react";
import {Routes, Route} from "react-router-dom";

// imports App.js styles
import './App.scss';

// import all components to be rendered with routes.
import Protected from "./Protected";
import NavBar from "./components/navbar/navbar.components";
import EmployeeForm from './components/job-description/add-job';
import LoginCard from './components/Login/login.cards.components';
import MyCalendar from "./components/calender/calender.component";
import SignUpCard from './components/SignUp/SignUp.cards.components';
import EnhancedTableHead from './components/job-description/job-details';
import MockInterview from "./components/mock-interview/mock-interview.components";
import InterviewExperience from '../src/components/interview-experience/interview-experience';

// App component is injected to index.html with all routes mapped to component to be rendered.
function App() {
  return (
          <Routes>
              <Route path='/sign-up' element={<NavBar> <SignUpCard /> </NavBar>} />
              <Route path='/login' element={<NavBar> <LoginCard /> </NavBar>} />
              <Route path='/' element={<NavBar> <LoginCard/> </NavBar>}/>

              <Route path='/mock-interviews' element={
                  <NavBar>
                      <Protected>
                          <MockInterview/>
                      </Protected>
                  </NavBar>
              }/>

              <Route path='/calender' element={
                  <NavBar>
                      <Protected>
                          <MyCalendar/>
                      </Protected>
                  </NavBar>
              } />

              <Route path='/interview-experiences' element={
                  <NavBar>
                      <Protected>
                          <InterviewExperience/>
                      </Protected>
                  </NavBar>
              }/>

              <Route path='/job-listings' element={
                  <NavBar>
                      <Protected>
                          <EnhancedTableHead />
                      </Protected>
                  </NavBar>
              }/>

              <Route path='/add-form' element={
                  <NavBar>
                      <Protected>
                          <EmployeeForm />
                      </Protected>
                  </NavBar>
              }/>
          </Routes>
  );
}

export default App;
