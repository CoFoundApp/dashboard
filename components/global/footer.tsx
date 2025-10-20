interface FooterProps {
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
}

const Footer = ({
    copyright = "© 2025 CoFound. Tous droits réservés.",
    bottomLinks = [
        { text: "Mentions légales", url: `${process.env.NEXT_PUBLIC_LANDING_URL}/mentions-legales` },
        { text: "Politique de confidentialité", url: `${process.env.NEXT_PUBLIC_LANDING_URL}/politique-confidentialite` },
    ],
}: FooterProps) => {
    return (
        <section className="py-4">
            <footer>
                <div className="text-muted-foreground flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
                    <p>{copyright}</p>
                    <ul className="flex gap-4">
                        {bottomLinks.map((link, linkIdx) => (
                            <li key={linkIdx} className="hover:text-primary underline">
                                <a href={link.url} target="_blank">{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </footer>
        </section>
    );
};

export { Footer };
