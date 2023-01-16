import React, { useState } from 'react';
const UserSocial = (props) => {
    const [Liked, setLiked] = useState(false);
    const myProps = props.Pop;
    return (
        <>
            <div className="d-flex share-icons py-3">
                <p onClick={() => myProps(true)} className="comments">
                    <img src="../assets/msg.svg" alt="msg" className="feddicon" /> 2 comments
                </p>
                <p>
                    {!Liked ? (
                        <>
                            <img src="../assets/heart.svg" alt="msg" onClick={() => setLiked(!Liked)} className="feddicon" /> 20 likes
                        </>
                    ) : (
                        <>
                            <img src="../assets/Liked.png" alt="msg" onClick={() => setLiked(!Liked)} className="feddicon" /> 20 likes
                        </>
                    )}
                </p>
                <p>
                    <img src="../assets/share.svg" alt="msg" className="feddicon" /> share
                </p>
            </div>
        </>
    );
};
export default UserSocial;
