import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Read article created by user1 as authorized user2`, async ({
  registeredUsers,
  userRequests,
  newArticleData,
}) => {
  const user1 = registeredUsers[0];
  const user2 = registeredUsers[1];

  const user1ArticlesApi = new ArticlesApi(userRequests[0]);
  const user2ArticlesApi = new ArticlesApi(userRequests[1]);

  const createResponse = await user1ArticlesApi.createArticle(
    newArticleData,
    user1.token,
  );

  await user1ArticlesApi.assertSuccessResponseCode(createResponse);

  const slug = await user1ArticlesApi.parseSlugFromBody(createResponse);

  const response = await user2ArticlesApi.getArticle(slug, user2.token);

  await user2ArticlesApi.assertSuccessResponseCode(response);
  await user2ArticlesApi.assertTitleIsCorrect(response, newArticleData.title);
  await user2ArticlesApi.assertAuthorUsernameIsCorrect(
    response,
    user1.username,
  );
});
