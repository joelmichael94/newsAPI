import React, { useState, useEffect, useRef } from "react";
import Article from "./components/Article";
import ReactPaginate from "react-paginate";

const App = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [country, setCountry] = useState("");
    // const [category, setCategory] = useState("");

    const country = useRef("");
    const category = useRef("");

    const [pageNumber, setPageNumber] = useState(0);

    const newsPerPage = 3;
    const pagesVisited = pageNumber * newsPerPage;

    const displayNews = news.length ? (
        news
            .slice(pagesVisited, pagesVisited + newsPerPage)
            .map((article, i) => <Article data={article} key={i} />)
    ) : (
        <p>No News to Show</p>
    );

    const getNews = async (country, category) => {
        setLoading(true);
        if (!country) country = "my";
        if (!category) category = "business";

        let res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}`
        );
        let data = await res.json();
        setNews(data.articles);
        setLoading(false);
    };

    useEffect(() => {
        getNews(country.current, category.current);
    }, []);

    // const showNews = news.length ? (
    //     news.map((article, i) => <Article data={article} key={i} />)
    // ) : (
    //     <p>No News to Show</p>
    // )

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

    const pageCount = Math.ceil(news.length / newsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            {loading ? (
                <p>Your internet is slow</p>
            ) : (
                <div className="grid place-items-center">
                    <div className="flex justify-center my-5 border border-slate-500 px-10 py-5 text-lg">
                        {/* Select dropdown for country and categories */}
                        <select
                            className="mx-10"
                            name="country"
                            defaultValue={""}
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
                            className="mx-10"
                            name="category"
                            defaultValue={""}
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
                        <button
                            className="mx-10"
                            onClick={() =>
                                getNews(country.current, category.current)
                            }
                        >
                            Search
                        </button>
                    </div>
                    <div>{displayNews}</div>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
