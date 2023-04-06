import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPersonalData } from "../store/actions/personal";
import { Helmet } from "react-helmet";

const Personal = () => {
    const dispatch = useDispatch();
    const personalData = useSelector((state) => state.personal);

    useEffect(() => {
        dispatch(fetchPersonalData);
    }, []);

    return (
        <div>
            <Helmet>
                <title>Personal</title>
            </Helmet>
            <h1>Personal</h1>
            <p>Username: {personalData?.userInfo.username}</p>
            <p>Job: {personalData?.userInfo.job}</p>
        </div>
    )
}

Personal.getInitialProps = async (store) => {
    return store.dispatch(fetchPersonalData);
}

export default Personal;