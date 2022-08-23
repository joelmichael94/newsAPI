import React, { useState, useEffect, useRef } from "react";
import Article from "./components/Article";

const App = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [country, setCountry] = useState("");
    // const [category, setCategory] = useState("");
    const country = useRef("");
    const category = useRef("");
    const from = useRef("");
    const to = useRef("");

    const getNews = async (country, category, from, to) => {
        setLoading(true);
        if (!country) country = "my";
        if (!category) category = "business";
        from ? (from = `&from=${from}`) : (from = "");
        to ? (to = `&to=${to}`) : (to = "");

        let res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}${from}${to}&apiKey=${process.env.REACT_APP_API_KEY}`
        );
        let data = await res.json();
        setNews(data.articles);
        setLoading(false);
    };

    useEffect(() => {
        getNews(country.current, category.current, from.current, to.current);
    }, []);

    const showNews =
        news ? (
            news.map((article, i) => <Article data={article} key={i} />)
        ) : (
            <p>No News to Show</p>
        );

    const categories = [
        "general",
        "business",
        "health",
        "entertainment",
        "science",
        "sports",
        "technology",
    ];

    const countries = [
        "my",
        "ch",
        "at",
        "au",
        "ae",
        "cn",
        "jp",
        "ph",
        "vn",
        "th",
        "ru",
        "in",
    ];

    // const selectCountry = (e) => {
    //     setCountry(e.target.value);
    // };

    // const selectCategory = (e) => {
    //     setCategory(e.target.value);
    // };

    // const onSubmitHandler = () => {
    //     getNews(country, category);
    // };

    return (
        <div className="w-screen">
            {loading ? (
                <p>Your internet is slow</p>
            ) : (
                <>
                    <div>
                        {/* {Select dropdown for country and categories} */}
                        <select
                            name="country"
                            defaultValue={""}
                            // onChange={selectCountry}
                            onChange={(e) => {
                                country.current = e.target.value;
                                console.log(country.current);
                            }}
                        >
                            <option value="" disabled>
                                Choose Country
                            </option>
                            {countries.map((country, i) => (
                                <option value={country} key={i}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        <select
                            name="category"
                            defaultValue={""}
                            // onChange={selectCategory}
                            onChange={(e) => {
                                category.current = e.target.value;
                                console.log(category.current);
                            }}
                        >
                            <option value="" disabled>
                                Choose Category
                            </option>
                            {categories.map((category, i) => (
                                <option value={category} key={i}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <div>
                            <label>From: </label>
                            <input
                                type="date"
                                name="from"
                                onChange={(e) => {
                                    from.current = e.target.value;
                                    console.log(from.current);
                                }}
                            />
                            <label>To: </label>
                            <input
                                type="date"
                                name="to"
                                onChange={(e) => {
                                    to.current = e.target.value;
                                    console.log(to.current);
                                }}
                            />
                        </div>
                        <button
                            /*onClick={onSubmitHandler}*/ onClick={() =>
                                getNews(
                                    country.current,
                                    category.current,
                                    from.current,
                                    to.current
                                )
                            }
                        >
                            Search
                        </button>
                    </div>
                    {showNews}
                </>
            )}
        </div>
    );
};

export default App;
