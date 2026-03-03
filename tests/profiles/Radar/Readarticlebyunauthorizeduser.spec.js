import { test } from '../../_fixtures/fixtures';

test(`Read existing article by unauthorized user`, async ({
  registeredUser,
  newArticleData,
  articlesApi,
}) => {
  const createResponse = await articlesApi.createArticle(
    newArticleData,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(createResponse);

  const slug = await articlesApi.parseSlugFromBody(createResponse);

  const response = await articlesApi.getArticle(slug);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleIsCorrect(response, newArticleData.title);
  await articlesApi.assertAuthorUsernameIsCorrect(
    response,
    registeredUser.username,
  );
});
