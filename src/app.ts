import { config } from 'dotenv';
config();
import Logging from './library/logging';
import axios from 'axios';

const owner = 'YasirHasn9';
const token = process.env.TOKEN;
if (!token) {
  Logging.error('GitHub token is not set in the environment variables.');
  process.exit(1);
}

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${token}`,
  },
});

const whiteList = [
  'YasirHasn9',
  'NodeTS-ProductionSetup',
  'github-cli-to-delete-multiple-repos',
  'Sha3ayir_server',
  'SnippetMe',
  'tanoor-restaurant',
  'genetateCsv',
  'epic-react-fundamentals',
  'genetateCsv',
];

interface Repository {
  name: string;
  visibility: string;
}

async function fetchRepositories(): Promise<Repository[]> {
  let page = 1;
  const perPage = 100; // Maximum allowed
  let fetchedRepos: Repository[] = [];
  let hasMore = true;
  try {
    while (hasMore) {
      const response = await axiosInstance.get(
        `/user/repos?per_page=${perPage}&page=${page}`,
      );
      const repos = response.data as Repository[];
      if (repos.length === 0) {
        hasMore = false; //
      }
      fetchedRepos = [...fetchedRepos, ...repos];
      page++;
    }

    Logging.info(`Total repositories fetched: ${fetchedRepos.length}`);
    return fetchedRepos;
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logging.error(`Error fetching repositories: ${error.message}`);
    } else {
      Logging.error('Error fetching repositories');
    }
    return [];
  }
}

async function deleteRepository(repoName: string): Promise<void> {
  try {
    await axiosInstance.delete(`/repos/${owner}/${repoName}`);
    Logging.info(`Repository ${repoName} deleted successfully`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logging.error(`Error deleting repository
      [Name]:${repoName}
      [Message]:${error.message}`);
    }
    Logging.error(`Error deleting repository ${error}`);
  }
}

async function main(): Promise<void> {
  const repos = await fetchRepositories();
  const deletePromises = repos
    .filter(
      (repo: Repository) =>
        !whiteList.includes(repo.name) && repo.visibility === 'public',
    )
    .map((repo) => deleteRepository(repo.name));

  await Promise.all(deletePromises);
}
main();
