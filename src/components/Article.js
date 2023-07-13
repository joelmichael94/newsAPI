import React from "react";
import moment from "moment";

const Article = ({ data }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-1/2 flex flex-col justify-center items-center mb-5 border border-slate-500 p-10">
                <img src={data.urlToImage} alt={data.title} className="mb-3" />
                <h2 className="text-2xl font-bold mb-3">{data.title}</h2>
                <p className="mb-3 text-xl">{data.description}</p>
                <small className="text-lg">{data.author}</small>
                <small className="text-lg">
                    {moment(data.publishedAt).format("LLLL")}
                </small>
            </div>
        </div>
    );
};

export default Article;
