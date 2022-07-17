import React from 'react';
import styled from 'styled-components';
import NewsItems from '../newsItem/index';
import axios from 'axios';
import usePromise from '../../lib/usePromise';

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    const API_KEY = process.env.REACT_APP_API_KEY;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`,
    );
  }, [category]);

  // 대기 중일 때,
  if (loading) {
    return <NewsListBlock>대기 중 ...</NewsListBlock>;
  }

  // 아직 response 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  // 에러가 발생했을 때
  if (error) {
    return <NewsListBlock>에러 발생 !</NewsListBlock>;
  }

  // response 값이 유효하고 대기중인 상태가 종료됐을 때
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItems key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
