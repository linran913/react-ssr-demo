import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../store/actions/home";
import { Helmet } from "react-helmet";

const Home = () => {
    const dispatch = useDispatch();
    const homeData = useSelector((state) => state.home);
    console.log("homeData:\n",homeData);
    
    useEffect(() => {
        dispatch(fetchHomeData)
    },[])

    const handleClick = () => {
        console.log("click");
    }
    const renderHead = () => {
        return (
            <Helmet>
                <title>Home</title>
            </Helmet>
        )
    }

    return (
        <div>
            {renderHead()}
            <h1>Home</h1>
            <ul>
            {
                homeData.articles.map( article => (
                    <li key={article.id}>
                        <p>{article.title}</p>
                        <p>{article.content}</p>
                    </li>
                ))
            }
            </ul>
            <button onClick={handleClick}>Click me !</button>
        </div>
    )
}

Home.getInitialProps = async (store) => {
    return store.dispatch(fetchHomeData);
}

export default Home;