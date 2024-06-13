
import React from 'react';
import Post from '../component/post/post.component';
import '../style/home.page.css';
import { API } from '../services/API/API';
import { Article, ArticleQueryResponse } from '../type/article.type';
import { APIResponseStatus } from '../enum/interface-signals.enum';

function HomePage() {
    const [articles, setArticles] = React.useState([] as Array<Article>);

    React.useEffect(() => {
        API.getNewsFeed().then((response: ArticleQueryResponse) => {
            if (response.status === APIResponseStatus.OK) {
                setArticles(response.data);
            }
        });
    }, []);

    console.log(articles);

    const NewsFeedContent = () => {

    }

    return (
        <div id='card_scroller'>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
        </div>
    );
}

export default HomePage;
