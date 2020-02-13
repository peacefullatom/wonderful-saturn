type TDisqusConfig = {
  url: string;
  identifier: string;
  title: string;
};

type TDisqusLocation = {
  pathname?: string;
};

export default function(
  location?: TDisqusLocation,
  title?: string
): TDisqusConfig {
  const pathname = location?.pathname ?? ``;
  const blogIdentity = pathname.split('/')[2];
  return {
    url: `https://scipios.netlify.com${pathname}`,
    identifier: blogIdentity,
    title: title || ``,
  };
}
