import { Button } from "@/components/ui/button";
import { Zap, ArrowUp, Bolt } from "lucide-react";

const Products = () => {
    return (
        <section className="py-32">
            <div className="container">
                {/* <p className="mb-4 text-sm text-muted-foreground lg:text-base">
                    OUR VALUES
                </p> */}
                <h2 className="text-3xl font-medium lg:text-4xl">Our Products</h2>
                <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
                    <div className="rounded-lg bg-accent p-5 flex flex-col">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <Zap className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Zap</h3>
                        <p className="leading-7 text-muted-foreground">
                            Enhance user experience with our zap solution. Consolidate multiple transactions into one, reduce the number of clicks, and keep your users coming back for more with a smoother, faster process.
                        </p>
                        <div className="mt-auto">
                            <Button className="mt-6 w-full">Learn More</Button>
                        </div>
                    </div>
                    <div className="rounded-lg bg-accent p-5 flex flex-col">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <ArrowUp className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">UpTickr</h3>
                        <p className="leading-7 text-muted-foreground">
                            Building...
                        </p>
                        <div className="mt-auto">
                            <Button className="mt-6 w-full">Learn More</Button>
                        </div>
                    </div>
                    <div className="rounded-lg bg-accent p-5 flex flex-col">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <Bolt className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Custom Software</h3>
                        <p className="leading-7 text-muted-foreground">
                            We can build custom software to fit your needs. Whether you need a simple tool to help you with your business, or a complex system to manage your operations, we can help.
                        </p>
                        <div className="mt-auto">
                            <Button className="mt-6 w-full">Learn More</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
