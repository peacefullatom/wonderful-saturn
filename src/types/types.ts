import components from '../components';

export type TPage = {
  url: string;
  relativePath: string;
  relativeDir: string;
  base: string;
  name: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    thumb_img_path: string;
    comments_count: number;
    positive_reactions_count: number;
    tags: string[];
    canonical_url: string;
    template: string;
  };
  html: string;
};

export type TComponents = keyof typeof components;

export type TPageContext = {
  url?: string;
  frontmatter?: {
    title?: string;
    canonical_url?: string;
    template?: string;
    layout_style?: string;
    subtitle?: string;
    img_path?: string;
    content_img_path?: string;
    date?: Date;
    sections?: {
      component?: TComponents;
      section_id?: string;
      type?: string;
      content?: string;
    }[];
  };
  menus?: {
    main?: {
      url?: string;
      title?: string;
    }[];
  };
  site?: {
    data?: {
      data?: {
        author?: {
          name: string;
          avatar: string;
        };
        social?: {
          [key: string]: {
            username: string;
            type: string;
            title: string;
            icon: string;
            url: string;
          };
        };
      };
      social?: {
        links: {
          username: string;
          type: string;
          title: string;
          icon: string;
          url: string;
        }[];
      };
    };
    siteMetadata?: {
      layout_style?: string;
      palette?: string;
      header?: {
        profile_img?: string;
        title?: string;
        tagline?: string;
        has_nav?: boolean;
        bg?: string;
        has_social?: boolean;
      };
      footer?: {
        content?: string;
        links?: {
          url?: string;
          new_window?: boolean;
          text?: string;
        }[];
      };
      author?: string;
      title?: string;
      titleTemplate?: string;
      description?: string;
      url?: string;
      image?: string;
      twitterUserName?: string;
      siteUrl?: string;
    };
  };
  pages?: TPage[];
  html?: string;
  excerpt?: string;
  canonical_url?: string;
};

export type TSection = {
  title?: string;
  image?: string;
  section_id?: string;
  content?: string;
  num_posts_displayed?: number;
  actions?: {
    url?: string;
    label?: string;
  }[];
};

export type TLayout = {
  children?: React.ReactNode;
  section?: TSection;
  pageContext?: TPageContext;
};
