import type { ProjectItem } from '@/types/project';

/**
 * 项目展示页面配置
 */
export interface ProjectsConfig {
  /** 是否启用项目页面 */
  enabled: boolean;
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  description: string;
  /** 总开关：是否自动从 GitHub 获取 star 数量和 topics，设置为 false 则全部使用手动配置 */
  autoFetchGithubInfo?: boolean;
  /** 项目列表 */
  projects: ProjectItem[];
}

// 默认配置
export const projectsConfig: ProjectsConfig = {
  enabled: true,
  title: '我的项目',
  description: '这里展示了我开发的一些开源项目和个人作品',
  autoFetchGithubInfo: true,
  projects: [
    // 推荐的项目
    {
      name: 'InfoShare System',
      description: '一个基于 Astro 构建的现代化博客系统，支持深色模式、多种布局、RSS 订阅等功能',
      // image: '/assets/images/projects/firefly-blog.png',
      image: 'assets/images/DesktopWallpaper/d1.avif',
      tags: ['Astro', 'TypeScript', 'Blog'],
      githubUrl: 'https://github.com/Furjesk/InfoShareSys_Vue',
      demoUrl: 'https://github.com/Furjesk/InfoShareSys_Vue',
      featured: true,
    },

    // 其他项目
    {
      autoFetchGithubInfo: false,
      name: 'Ning Schedule',
      description: '一个基于 Astro 构建的现代化博客系统，支持深色模式、多种布局、RSS 订阅等功能',
      image: 'assets/images/DesktopWallpaper/d1.avif',
      tags: ['Astro', 'TypeScript', 'Blog'],
      // language: 'JavaScript',
      // githubUrl: 'https://github.com/Furjesk/Ning-schedule',
      githubOwner: 'Furjesk',
      githubRepo: 'Ning-schedule',
      demoUrl: 'https://github.com/Furjesk/Ning-schedule',
      starCount: 2,
    },
    {
      autoFetchGithubInfo: false,
      name: 'Firefly Blog',
      description: '一个基于 Astro 构建的现代化博客系统，支持深色模式、多种布局、RSS 订阅等功能',
      image: 'assets/images/DesktopWallpaper/d1.avif',
      tags: ['Astro', 'TypeScript', 'Blog'],
      language: 'TypeScript',
      githubUrl: 'https://github.com/Furjesk/blog-firefly',
      demoUrl: '',
      starCount: 0,
    },
    // 可以在这里添加更多项目
  ]
};