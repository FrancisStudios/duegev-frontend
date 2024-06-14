
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

    const NewsFeedContent = () => {
        return articles.map((article: Article) => (<Post data={article} key={article.article_id}></Post>));
    }

    return (
        <div id='card_scroller'>
            {NewsFeedContent()}
        </div>
    );
}

export default HomePage;
