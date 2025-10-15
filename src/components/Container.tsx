import Flexbox from "@/components/Flexbox";

export default function Container({ children }) {
  return (
    <Flexbox col className={"min-w-[60%] mx-auto bg-transbg rounded-xl p-2 md:p-6 lg:p-8 xl:p-10 m-5"}>
      {children}
    </Flexbox>
  );
}
