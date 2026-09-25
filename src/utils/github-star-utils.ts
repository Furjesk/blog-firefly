import type { ProjectItem } from '@/types/project';

/**
 * 从 GitHub URL 中提取所有者和仓库名称
 */
export function extractGithubOwnerRepo(url: string): { owner: string; repo: string } | null {
  try {
    // 处理 https://github.com/owner/repo 格式
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace(/\.git$/, ''),
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 获取单个 GitHub 仓库的 star 数量和语言
 */
async function getRepoInfo(owner: string, repo: string): Promise<{ starCount: number | null; language: string | null; name: string | null }> {
  try {
    // 使用 GitHub API 获取仓库信息
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // 如果配置了 GitHub Token，添加认证以提高速率限制
    const githubToken = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch repo info for ${owner}/${repo}: ${response.status}`);
      return { starCount: null, language: null, name: null };
    }

    const data = await response.json();
    console.log(`====>Fetched repo info for ${owner}/${repo}`);
    return {
      starCount: data.stargazers_count,
      language: data.language || null,
      name: data.name || null,
    };
  } catch (error) {
    console.error(`Error fetching repo info for ${owner}/${repo}:`, error);
    return { starCount: null, language: null, name: null };
  }
}

/**
 * 为所有项目获取 star 数量和语言信息
 */
export async function fetchAllProjectStars(projects: ProjectItem[], autoFetchGithubInfo: boolean = true): Promise<ProjectItem[]> {
  // 如果全局关闭自动获取，直接返回原项目列表
  if (!autoFetchGithubInfo) {
    return projects;
  }
  
  const projectsWithInfo = await Promise.all(
    projects.map(async (project) => {
      // 如果关闭自动获取，直接返回原项目信息
      if (project.autoFetchGithubInfo === false) {
        return project;
      }
      
      // 如果有 githubOwner 和 githubRepo，直接使用
      if (project.githubOwner && project.githubRepo) {
        const { starCount, language, name } = await getRepoInfo(project.githubOwner, project.githubRepo);
        return {
          ...project,
          name: project.name ?? (name ?? undefined),
          starCount: project.starCount ?? (starCount ?? undefined),
          language: project.language ?? (language ?? undefined),
        };
      }

      // 如果有 githubUrl，尝试提取 owner 和 repo
      if (project.githubUrl) {
        const info = extractGithubOwnerRepo(project.githubUrl);
        if (info) {
          const { starCount, language, name } = await getRepoInfo(info.owner, info.repo);
          return {
            ...project,
            githubOwner: info.owner,
            githubRepo: info.repo,
            name: project.name ?? (name ?? undefined),
            starCount: project.starCount ?? (starCount ?? undefined),
            language: project.language ?? (language ?? undefined),
          };
        }
      }

      return project;
    })
  );

  return projectsWithInfo;
}

/**
 * 格式化 star 数量
 * 1000 -> 1k
 * 1500 -> 1.5k
 */
export function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}