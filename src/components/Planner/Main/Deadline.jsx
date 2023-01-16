import React, { useState } from 'react';
import { Container, Button, Col, Row, Table, Modal } from 'react-bootstrap';
import Deadline from '../components/subjects/Deadlines';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// const Deadlines = () => {
//     return (
//         <>
//             <div>
//                 <Deadline />
//             </div>
//         </>
//     );
// };

// export default Deadlines;
