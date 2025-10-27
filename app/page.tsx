import Image from 'next/image';

function TwitchIcon() {
    return (
        <a href="https://www.twitch.tv/websquevenden">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Twitch</title>
                <path
                    d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286V20h5.143V24l4.286-4h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                    fill="currentColor"
                />
            </svg>
        </a>
    );
}

function YouTubeIcon() {
    return (
        <a href="https://www.youtube.com/@websquevenden">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>YouTube</title>
                <path
                    d="M23.498 6.186a2.983 2.983 0 00-2.1-2.11C19.718 3.5 12 3.5 12 3.5s-7.718 0-9.398.576a2.983 2.983 0 00-2.1 2.11C0 7.866 0 12 0 12s0 4.134.502 5.814a2.983 2.983 0 002.1 2.11C4.282 20.5 12 20.5 12 20.5s7.718 0 9.398-.576a2.983 2.983 0 002.1-2.11C24 16.134 24 12 24 12s0-4.134-.502-5.814zM9.75 15.02v-6.04l6.021 3.02L9.75 15.02z"
                    fill="currentColor"
                />
            </svg>
        </a>
    );
}

function LinkedInIcon() {
    return (
        <a href="https://www.linkedin.com/in/sergio-scardigno/">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>LinkedIn</title>
                <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    fill="currentColor"
                />
            </svg>
        </a>
    );
}

function TikTokIcon() {
    return (
        <a href="https://www.tiktok.com/@web.que.venden">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>TikTok</title>
                <path
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                    fill="currentColor"
                />
            </svg>
        </a>
    );
}

type Data = {
    name: string;
    avatar: string;
    links: Array<{
        href: string;
        title: string;
        image?: string;
    }>;
    socials: Array<{
        href: string;
        title: string;
    }>;
};

function LinkCard({
    href,
    title,
    image,
}: {
    href: string;
    title: string;
    image?: string;
}) {
    return (
        <a
            href={href}
            className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all 
      border border-gray-300 mb-3 bg-gray-100 max-w-3xl"
        >
            <div className="flex text-center w-full">
                {image && ( // Mostrar solo si existe la imagen
                    <div className="w-10 h-10">
                        <Image
                            className="rounded-sm"
                            alt={title}
                            src={image}
                            width={40}
                            height={40}
                        />
                    </div>
                )}
                <h2
                    className="flex justify-center items-center 
        font-semibold w-full text-gray-700 -ml-10"
                >
                    {title}
                </h2>
            </div>
        </a>
    );
}

const data: Data = {
    name: 'Web que venden!',
    avatar: '/img/logo.png',
    links: [
        {
            href: 'https://www.tiktok.com/@web.que.venden',
            title: 'TikTok',
            image: '/img/tiktok.png',
        },
        {
            href: 'https://www.youtube.com/@websquevenden',
            title: 'YouTube',
            image: '/img/youtube.png',
        },
        {
            href: 'https://www.twitch.tv/websquevenden',
            title: 'Twitch',
            image: '/img/twich.png', // Reusing icon temporarily
        },
        {
            href: 'https://www.linkedin.com/in/sergio-scardigno/',
            title: 'LinkedIn',
            image: '/img/linkedin.png', // Reusing icon temporarily
        },
        {
            href: '/blog',
            title: 'Blog',
            image: '/img/blog.png',
        },
    ],
    socials: [
        {
            href: 'https://www.youtube.com/@websquevenden',
            title: 'YouTube',
        },
        {
            href: 'https://www.twitch.tv/websquevenden',
            title: 'Twitch',
        },
        {
            href: 'https://www.tiktok.com/@web.que.venden',
            title: 'TikTok',
        },
        {
            href: 'https://www.linkedin.com/in/sergio-scardigno/',
            title: 'LinkedIn',
        },
    ],
};

export default function HomePage() {
    return (
        <div
            className="flex items-center flex-col mx-auto w-full justify-center mt-16
    px-8"
        >
            <Image
                className="rounded-full"
                alt={data.name}
                src={data.avatar}
                width={96}
                height={96}
            />

            <h1 className="font-bold mt-4 text-xl mb-8 text-white">
                {data.name}
            </h1>

            {data.links.map((link) => (
                <LinkCard key={link.href} {...link} />
            ))}

            <div className="flex items-center gap-4 mt-8 text-white">
                {data.socials.map((social) => {
                    if (social.href.includes('youtube')) {
                        return <YouTubeIcon key={social.href} />;
                    }
                    if (social.href.includes('twitch')) {
                        return <TwitchIcon key={social.href} />;
                    }
                    if (social.href.includes('tiktok')) {
                        return <TikTokIcon key={social.href} />;
                    }
                    if (social.href.includes('linkedin')) {
                        return <LinkedInIcon key={social.href} />;
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
