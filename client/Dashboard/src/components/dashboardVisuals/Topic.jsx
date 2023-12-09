import React, { useState } from 'react';
import '../../App.css';

const Topic = ({ data }) => {
    // State to manage the displayed article number
    const [articleNumber, setArticleNumber] = useState(1);

    // Handle change in the article number input
    const handleArticleNumberChange = (event) => {
        const number = parseInt(event.target.value, 10);
        setArticleNumber(number);
    };

    // Get data for the currently displayed article
    const articleData = data[articleNumber - 1];

    return (
        <div className="topic-container">
            <h2 className="topic-header">All Data</h2>

            <label htmlFor="articleNumber" className="article-number-input-label">
                Enter Article Number (1 to 30):
            </label>
            <input
                type="number"
                id="articleNumber"
                value={articleNumber}
                onChange={handleArticleNumberChange}
                min="1"
                max="30"
                className="article-number-input"
            />

            {articleData && (
                <div className="article-details">
                    <h3>Article {articleNumber}</h3>
                    <ul>
                        <li><strong>Title:</strong> {articleData.title}</li>
                        <li><strong>Country:</strong> {articleData.country}</li>
                        <li><strong>Intensity:</strong> {articleData.intensity}</li>
                        <li><strong>URL:</strong> <a href={articleData.url} target="_blank" rel="noopener noreferrer">{articleData.url}</a></li>
                        <li><strong>Region:</strong> {articleData.region}</li>
                        <li><strong>Likelihood:</strong> {articleData.likelihood}</li>
                        <li><strong>Added on:</strong> {articleData.added}</li>
                        <li><strong>Published on:</strong> {articleData.published}</li>
                        <li><strong>Source:</strong> {articleData.source}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Topic;
