import FormUpdate from "./_component/FormUpdate";

export default function Page() {
  return (
    <div className="grid place-content-center w-full h-screen">
      <div className="w-[1000px] h-[520px] px-8 py-10 space-y-7">
        <h3 className="font-medium">Hồ sơ của bạn</h3>
        <FormUpdate />
      </div>
    </div>
  );
}
