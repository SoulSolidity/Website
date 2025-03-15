import Image from "next/image";
import Link from "next/link";

interface Project {
    name: string;
    logo: string;
    url: string;
}

const projects: Project[] = [
    {
        name: "ApeBond",
        logo: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/ApeBond.jpg",
        url: "https://ape.bond",
    },
    {
        name: "QuickSwap",
        logo: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Quickswap.jpg",
        url: "https://quickswap.exchange/",
    },
    {
        name: "AI Tech",
        logo: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/AITech.jpg",
        url: "https://aitech.io/",
    },
    // Add more projects as needed
];

export default function ProjectsSection() {
    return (
        <section className="container">
            <div className="text-center mb-16">
                <h2 className="text-xl font-medium">
                    Trusted by Leading Projects
                </h2>
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full max-w-4xl">
                    {projects.map((project) => (
                        <Link
                            href={project.url}
                            key={project.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center"
                        >
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-background/5 transition-all duration-300 group-hover:scale-105">
                                <Image
                                    src={project.logo}
                                    alt={project.name}
                                    fill
                                    className="object-cover group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                        // @ts-ignore
                                        e.currentTarget.src = '/logos/projects/default.svg';
                                    }}
                                />
                            </div>
                            <p className="mt-4 text-sm font-medium text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300">
                                {project.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
} 