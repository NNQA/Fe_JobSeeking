import DeskTopUi from "./_component/DeskTopUi";

export default function Page() {

    const isDesktop = true;
    return (
        <div>
            {isDesktop ? <DeskTopUi /> : null}
        </div>
    );
}