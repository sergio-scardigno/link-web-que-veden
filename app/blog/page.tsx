'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getPosts } from '../../lib/api';

const WHATSAPP_NUMBER = '+543388418860';
const FALLBACK_IMAGE = '/img/logo.png';

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

interface StrapiImageFormat {
    url?: string;
}

interface StrapiImage {
    url?: string | null;
    formats?: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
    };
}

interface StrapiPost {
    id: number;
    titulo: string;
    contenido: string;
    imagen?: StrapiImage | null;
    fecha?: string;
}

export default function Blog() {
    const [posts, setPosts] = useState<StrapiPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getPosts();

                if (!Array.isArray(data)) {
                    throw new Error('Formato de respuesta inesperado.');
                }

                if (isMounted) {
                    setPosts(data);
                    setError(null);
                }
            } catch (err) {
                console.error('Error cargando posts desde Strapi:', err);

                if (isMounted) {
                    const message =
                        err instanceof Error
                            ? err.message
                            : 'No pudimos cargar el contenido.';

                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleWhatsAppPost = (post: StrapiPost) => {
        const mensaje = `Hola! Vi tu publicación "${post.titulo}" y me gustaría obtener más información.

${post.contenido ?? ''}

¿Podrías brindarme más detalles?`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            mensaje
        )}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const resolveImageUrl = (imagen?: StrapiImage | null) => {
        if (!imagen) {
            return FALLBACK_IMAGE;
        }

        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';
        const relativeUrl =
            imagen.formats?.medium?.url ??
            imagen.formats?.small?.url ??
            imagen.formats?.thumbnail?.url ??
            imagen.url ??
            undefined;

        if (!relativeUrl) {
            return FALLBACK_IMAGE;
        }

        if (relativeUrl.startsWith('http')) {
            return relativeUrl;
        }

        return `${baseUrl}${relativeUrl}`;
    };

    return (
        <>
            <section className="container mx-auto px-4 py-8 pb-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Blog
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Últimas publicaciones y contenido
                    </p>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                            <p className="text-gray-200">Cargando contenido...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 text-center">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {!isLoading && !error && posts.length === 0 && (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <p className="text-gray-200 text-lg">
                            Todavía no hay publicaciones disponibles.
                        </p>
                    </div>
                )}

                {posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="relative w-full h-56">
                                    <Image
                                        src={resolveImageUrl(post.imagen)}
                                        alt={post.titulo}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                                        {post.titulo}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.contenido}
                                    </p>
                                    <button
                                        onClick={() => handleWhatsAppPost(post)}
                                        className="w-full bg-green-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors font-semibold"
                                        aria-label={`Contactar por WhatsApp sobre ${post.titulo}`}
                                    >
                                        <WhatsAppIcon />
                                        <span>Contactar</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <Link
                href="/"
                className="fixed bottom-8 right-8 bg-white text-blue-600 px-6 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2 text-lg font-semibold z-50"
                aria-label="Volver al inicio"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Volver al inicio
            </Link>
        </>
    );
}

