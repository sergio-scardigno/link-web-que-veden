import { NextResponse } from 'next/server';

const DEFAULT_STRAPI_URL = 'https://scardigno-strapi.ndorzn.easypanel.host';

const STRAPI_URL =
    process.env.STRAPI_API_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    DEFAULT_STRAPI_URL;

const buildEndpoint = () =>
    `${STRAPI_URL.replace(/\/$/, '')}/mynextjs`;

export async function GET() {
    try {
        const response = await fetch(buildEndpoint(), {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(
                'Error al consultar Strapi:',
                response.status,
                errorText
            );

            return NextResponse.json(
                {
                    error: `Strapi respondió con ${response.status}`,
                },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('No se pudo conectar con Strapi:', error);

        return NextResponse.json(
            { error: 'No se pudo conectar con Strapi.' },
            { status: 500 }
        );
    }
}
