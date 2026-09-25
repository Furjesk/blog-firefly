export interface ProjectItem {
  /** 项目名称 */
  name?: string;
  /** 项目描述 */
  description: string;
  /** 项目图片/GIF/视频URL */
  image?: string;
  /** 视频URL（如果是视频演示） */
  video?: string;
  /** 项目标签 */
  tags?: string[];
  /** GitHub仓库地址 */
  githubUrl?: string;
  /** GitHub仓库所有者/用户名 */
  githubOwner?: string;
  /** GitHub仓库名称 */
  githubRepo?: string;
  /** 在线演示地址 */
  demoUrl?: string;
  /** 是否推荐 */
  featured?: boolean;
  /** GitHub star数量（动态获取） */
  starCount?: number;
  /** 项目主语言（动态获取） */
  language?: string;
  /** 项目级开关：是否自动从GitHub获取信息，默认为true，false则所有信息使用手动配置 */
  autoFetchGithubInfo?: boolean;
}