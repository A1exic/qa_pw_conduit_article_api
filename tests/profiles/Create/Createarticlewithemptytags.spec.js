import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test(`Create article with empty tags array`, async ({
  registeredUser,
  articlesApi,
  logger,
}) => {
  const articleData = generateNewArticleData(logger, 0);

  const response = await articlesApi.createArticle(
    articleData,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleIsCorrect(response, articleData.title);
  await articlesApi.assertTagListIsCorrect(response, []);
});
