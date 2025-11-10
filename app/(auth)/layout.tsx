import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <div className="flex items-center gap-2 font-medium">
                        <Image src={`/imports/icon-blue.svg`} alt="Logo de CoFound" height={24} width={24} className="rounded-md" />
                        CoFound
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        {children}
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image 
                    src={`/imports/coworking.jpg`} 
                    alt="Image de coworking" 
                    fill
                    sizes="(min-width:1024px) 50vw, 0vw"
                    className="absolute inset-0 object-cover" 
                    priority={false}
                />
            </div>
        </div>
    );
}