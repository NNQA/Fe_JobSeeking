import SkillSelection from "./_component/SkillSelection";

export default function Page() {
    return (
        <div className="h-full grid content-center md:px-20 px-2 gap-6 py-10">
            <p>2/10</p>
            <h1 className="leading-tight xl:leading-3">
                Great, so what kind of work are you here to do?
            </h1>
            <p>
                Don't worry, you can change these choices later on.
            </p>
            <hr className="border-foreground/10 h-1" />
            <SkillSelection />
        </div>
    );
}