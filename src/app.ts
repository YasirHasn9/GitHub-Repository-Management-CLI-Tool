import { config } from 'dotenv';
config();
import Logging from './library/logging';

import axios from 'axios';

const token = process.env.TOKEN;
Logging.info(token);

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${token}`,
  },
});
const dontDelete = [
  'YasirHasn9',
  'NodeTS-ProductionSetup',
  'github-cli-to-delete-multiple-repos',
  'Sha3ayir_server',
  'SnippetMe',
  'tanoor-restaurant',
  'genetateCsv',
  'epic-react-fundamentals',
];
async function fetchRepositories(): Promise<any> {
  try {
    const response = await axiosInstance.get('/user/repos');
    // Logging.info(response.data[0]);
    return response.data;
  } catch (error: any) {
    Logging.error(error.message);
    return [];
  }
}

const owner = 'YasirHasn9';
async function deleteRepository(repoName: string): Promise<void> {
  try {
    await axiosInstance.delete(`/repos/${owner}/${repoName}`);
    Logging.info(`Repository ${repoName} deleted successfully`);
  } catch (error: any) {
    Logging.error(`Error deleting repository ${repoName}: ${error.message}`);
  }
}
type Repository = any;
async function main(): Promise<void> {
  const repos = await fetchRepositories();
  // Add logic to select repositories and call deleteRepository for each
  repos.forEach((repo: Repository) => {
    if (!dontDelete.includes(repo.name)) {
      deleteRepository(repo.name);
    }
  });
}
main();
