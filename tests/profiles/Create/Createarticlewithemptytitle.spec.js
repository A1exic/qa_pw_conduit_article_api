import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { TITLE_CANNOT_BE_EMPTY } from '../../../src/constants/articleErrorMessages';

test(`Create article with empty title`, async ({
  registeredUser,
  articlesApi,
  logger,
}) => {
  const articleData = generateNewArticleData(logger, 0);

  articleData.title = '';

  const response = await articlesApi.createArticle(
    articleData,
    registeredUser.token,
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
  await articlesApi.assertErrorMessageInResponseBody(
    response,
    TITLE_CANNOT_BE_EMPTY,
  );
});
