import React, { Suspense, useMemo, useState, useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpinLoader from '../components/SpinLoader';
import { getLoggedUser } from '../helpers/utils';
import { Button } from 'react-bootstrap';
import { SocketContext } from '../context/SocketContext';
import AdvancedUserAnalytics from '../screens/AdvancedUserAnalytics';
const Home = React.lazy(() => import('../screens/Home'));
const Payments = React.lazy(() => import('../screens/Payment'));
const UsersProfile = React.lazy(() => import('../screens/UsersProfile'));
const Contact = React.lazy(() => import('../screens/Contact'));
const Terms_Services = React.lazy(() => import('../screens/Terms'));
const CreateGroup = React.lazy(() => import('../screens/CreateGroup'));
const Connection = React.lazy(() => import('../screens/Connection'));
const Search = React.lazy(() => import('../screens/Search'));
const Chat = React.lazy(() => import('../screens/Chat'));
const Feed = React.lazy(() => import('../screens/Feed'));
const Planner = React.lazy(() => import('../screens/Planner'));
const Course = React.lazy(() => import('../screens/Course'));
const Courses = React.lazy(() => import('../screens/Courses'));
const Group = React.lazy(() => import('../screens/Group'));
const Notifications = React.lazy(() => import('../screens/Notications'));
const Referals = React.lazy(() => import('../screens/Referal'));
const Subjects = React.lazy(() => import('../screens/Subjects'));
const UserAnalytics = React.lazy(() => import('../screens/UserAnalytics'));
const TeztSummary = React.lazy(() => import('../screens/TeztSumary'));
const Grades = React.lazy(() => import('../screens/Grades'));
const TeztGrades = React.lazy(() => import('../screens/TeztGrades.jsx'));
const StartTeztMode = React.lazy(() => import('../screens/StartTeztMode'));
const StartAdminTeztMode = React.lazy(() => import('../screens/StartAdminTeztMode'));
const StartTezt = React.lazy(() => import('../screens/StartTezt'));
const StartAdminTezt = React.lazy(() => import('../screens/StartAdminTezt'));
const InviteFriend = React.lazy(() => import('../screens/InviteFriend'));
const StudySession = React.lazy(() => import('../screens/StudySession'));
const StudyAdminSession = React.lazy(() => import('../screens/StudyAdminSession'));
const CreateStudySets = React.lazy(() => import('../screens/CreateStudySets'));
const FolderMain = React.lazy(() => import('../screens/Folders'));
const SignIn = React.lazy(() => import('../screens/SignIn'));
const Signup = React.lazy(() => import('../screens/SignUp'));
const ViewAnswer = React.lazy(() => import('../screens/ViewAnswer'));

function ApplicationRoutes() {
    const navigate = useNavigate();
    const { socketIO, dispatch } = useContext(SocketContext);

    const CustomToastForInvite = (data) => (
        <div className="d-flex toast-notify">
            <div>
                <p className="mb-0">
                    {data.sender} has invited you to {data.studySet.title}
                </p>
                <Button
                    onClick={() => {
                        const { teztData, ...remData } = data;
                        navigate('/start-tezt/' + data.studySet._id, { state: { ...teztData, ...remData, hasSenderStarted: true } });
                    }}
                    className="mx-2"
                >
                    Accept
                </Button>
            </div>
        </div>
    );

    useEffect(() => {
        if (!socketIO) {
            let user = getLoggedUser();
            dispatch({ type: 'SET_SOCKET_INSTANCE', username: user.username });
        }
    }, [socketIO]);
    useEffect(() => {
        if (socketIO) {
            socketIO.on('STUDY_INVITATION', (data) => {
                toast(() => CustomToastForInvite(data), {
                    position: 'top-right',
                    autoClose: 20000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
        }
    }, [socketIO]);

    // function RequireAuth() {
    //     const location = useLocation();
    //     const user = getLoggedUser();

    //     if (user._token) {
    //         return <Outlet />;
    //     }

    //     return <Navigate to="/login" state={{ from: location }} />; //@TODO send user back
    // }

    //const [user, setUser] = useState(null);
    //const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <>
            <Suspense fallback={<SpinLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/create-studySet" element={<CreateStudySets />} />
                    <Route path="/edit-studySet/:id" element={<CreateStudySets />} />
                    <Route path="/study-session/:studySetId" element={<StudySession />} />
                    <Route path="/study-Admin-session" element={<StudyAdminSession />} />
                    <Route path="/invite/:studySetId" element={<InviteFriend />} />
                    <Route path="/start-tezt/:studySetId" element={<StartTezt />} />
                    <Route path="/start-admin-tezt/:studySetId" element={<StartAdminTezt />} />
                    <Route path="/tezt-mode/:studySetId" element={<StartTeztMode />} />
                    <Route path="/tezt-admin-mode/:studySetId" element={<StartAdminTeztMode />} />
                    <Route path="/grade-tezt" element={<Grades />} />
                    <Route path="/teztGrade/:studyid" element={<TeztGrades />} />
                    <Route path="/tezt-summary" element={<TeztSummary />} />
                    <Route path="/tezt-Answer" element={<ViewAnswer />} />
                    <Route path="/user-analytics" element={<UserAnalytics />} />
                    <Route path="/advanced-user-analytics" element={<AdvancedUserAnalytics />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/referal" element={<Referals />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/group/:groupId" element={<Group />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    <Route path="/planer" element={<Planner />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/connection" element={<Connection />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path="/terms-services" element={<Terms_Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile/:profileId" element={<UsersProfile />} />
                    <Route path="/payment" element={<Payments />} />
                    <Route path="/folders/:folderId" element={<FolderMain />} />
                    {/* <Route element={<RequireAuth />}>routes component</Route>  */}
                </Routes>
                <ToastContainer />
            </Suspense>
        </>
    );
}

export default ApplicationRoutes;
