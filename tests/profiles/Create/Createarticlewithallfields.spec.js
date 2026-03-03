import { test } from '../../_fixtures/fixtures';

test(`Create article with all fields`, async ({
  registeredUser,
  newArticleData,
  articlesApi,
}) => {
  const response = await articlesApi.createArticle(
    newArticleData,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleIsCorrect(response, newArticleData.title);
  await articlesApi.assertDescriptionIsCorrect(
    response,
    newArticleData.description,
  );
  await articlesApi.assertBodyIsCorrect(response, newArticleData.text);
  await articlesApi.assertTagListIsCorrect(response, newArticleData.tags);
  await articlesApi.assertAuthorUsernameIsCorrect(
    response,
    registeredUser.username,
  );
});
