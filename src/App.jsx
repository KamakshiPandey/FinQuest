import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./components/slices/profileSlice";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetSuccess from "./components/authentication/ResetSuccess";
import VerifyEmail from "./components/authentication/VerifyEmail";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Calculator from "./components/Dashboard/Calculator/Calculator";
import Portfolio from "./components/Dashboard/Portfolio";
import WatchList from "./components/Dashboard/WatchList";
import Settings from "./components/Dashboard/Settings";
import NotFound from "./components/Pages.jsx/NotFound";
import UpdatePassword from "./components/authentication/UpdatePassword";
import WalletTab from "./components/Dashboard/WalletTab";
import Trading from "./components/Dashboard/TradeCenter/Trading";
import StockView from "./components/Dashboard/StockView/StockView";
import GamingHub from "./components/Dashboard/GamingHub/GamingHub";
import SpeedyMath from "./components/Dashboard/GamingHub/Games/SpeedyMath/SpeedyMath";
import FinancialQuiz from "./components/Dashboard/GamingHub/Games/FinancialQuiz/FinancialQuiz";
import WhoGetsMore from "./components/Dashboard/GamingHub/Games/WhoGetsMore/WhoGetsMore";
import WordSearchMain from "./components/Dashboard/GamingHub/Games/WordSearch/WordSearchMain";
// import RangeSlider from "./components/Dashboard/RangeSlider";
// import Tempu from './components/Dashboard/GamingHub/tempu'

export default function App() {
    const { user } = useSelector((state) => state.profile);
    const { signupData } = useSelector((state) => state.auth);
    return (
        <div className="overflow-x-hidden">
            {user && <NavBar />}
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                {/* <Route path="/hello" element={<RangeSlider/>} /> */}
                <Route path="/resetsuccess" element={<ResetSuccess />} />
                {signupData && (
                    <Route path="/verifyotp" element={<VerifyEmail />} />
                )}
                <Route path="/login" element={<Login />} />
                <Route
                    path="/update-password/:token"
                    element={<UpdatePassword />}
                />

                {user && (
                    <Route element={<Dashboard />}>
                        <Route
                            path="/dashboard/profile"
                            element={<WalletTab />}
                        />
                        <Route
                            path="/dashboard/gamingHub"
                            element={<GamingHub />}
                        />
                        
                        <Route
                            path="/dashboard/gamingHub/speedyMath"
                            element={<SpeedyMath />}
                        />
                        
                        <Route
                            path="/dashboard/gamingHub/financialQuiz"
                            element={<FinancialQuiz />}
                        />
                        
                        <Route
                            path="/dashboard/gamingHub/whoGetsMore"
                            element={<WhoGetsMore />}
                        />
                        
                        <Route
                            path="/dashboard/gamingHub/wordSearch"
                            element={<WordSearchMain />}
                        />
                        

                        <Route
                            path="/dashboard/portfolio"
                            element={<Portfolio />}
                        />
                        <Route
                            path="/dashboard/watchlist"
                            element={<WatchList />}
                        />
                        <Route
                            path="/dashboard/setting"
                            element={<Settings />}
                        />
                        <Route
                            path="/dashboard/tradeCenter"
                            element={<Trading />}
                        />
                        <Route
                            path="/dashboard/investmentCalculator"
                            element={<Calculator/>}
                        />
                        <Route
                            path="/dashboard/stockView/:symbol"
                            element={<StockView />}
                        />
                    </Route>
                )}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
