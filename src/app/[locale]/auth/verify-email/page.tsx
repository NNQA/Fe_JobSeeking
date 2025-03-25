import Logo from "@/components/svg/Logo";
import FormVerifiCation from "./_component/FormVerifiCation";

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Logo />
      <div className="h-full  grid place-content-center z-10 pb-20">
        <div className="order-2 md:order-2">
          <FormVerifiCation />
        </div>
      </div>
    </div>
  );
}
