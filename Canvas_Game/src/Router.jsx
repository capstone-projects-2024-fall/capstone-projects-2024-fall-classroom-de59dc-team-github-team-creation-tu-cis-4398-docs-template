import React, { createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage";
import AuthPage from "./auth";
import {
  Dashboard,
  // Team,
  // Invoices,
  // Contacts,
  // Form,
  // Bar,
  // Line,
  // Pie,
  // FAQ,
  // Geography,
  // Calendar,
  // Stream,
} from "./scenes";
import UserProfile from "./scenes/userProfile";
import { user } from './data/mockProfileData';
import ConnectCanvas from './ConnectCanvas';


import HelpPage from "./scenes/help";

// Create AuthContext
const AuthContext = createContext();

// Custom hook for easy access to Context
export const useAuth = () => useContext(AuthContext);

const AppRouter = () => {
  const [isSignedIn, setIsSignIn] = useState(false); // data base, local browser storage.

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignIn }}>
    <Router>
      <Routes>
      <Route path="/" element={isSignedIn? <App /> : <AuthPage/>}>
        {/* <Route path="/" element={<App />}> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/userProfile" element={<UserProfile user={user} />} />


        
          <Route path="/help" element={<HelpPage />} />

          <Route path="/ConnectCanvas" element={<ConnectCanvas/>}/>

          {/* <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} /> */}
        </Route>
      </Routes>
    </Router>
    </AuthContext.Provider>
  );
};

export default AppRouter;
