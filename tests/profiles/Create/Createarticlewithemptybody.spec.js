import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test(`Create article with empty body`, async ({
  registeredUser,
  articlesApi,
  logger,
}) => {
  const articleData = generateNewArticleData(logger, 0);

  articleData.text = '';

  const response = await articlesApi.createArticle(
    articleData,
    registeredUser.token,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
