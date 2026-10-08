import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function CarNotFound() {
    return (
        <section className="bg-paper py-24 md:py-32">
            <div className="container-page flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-gold-300">
                    <Icon name="car" size={30} />
                </span>
                <p className="eyebrow mt-8 text-gold-600">Stock not found</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    This car has been sold or moved.
                </h1>
                <p className="mt-3 max-w-md text-[15px] text-ink-500">
                    Good cars go quickly. Browse what&apos;s in the showroom now, or ask us to
                    import the same model for you.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button href="/cars" iconRight="arrow-right">
                        Browse inventory
                    </Button>
                    <Button href="/pre-order" variant="outline">
                        Request this model
                    </Button>
                </div>
            </div>
        </section>
    );
}
