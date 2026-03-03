import { test } from '../../_fixtures/fixtures';

test(`Create article by unauthorized user`, async ({
  newArticleData,
  articlesApi,
}) => {
  const response = await articlesApi.createArticleUnauthorized(newArticleData);

  await articlesApi.assertUnauthorizedResponseCode(response);
});
