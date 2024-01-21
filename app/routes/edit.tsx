import type { MetaFunction } from "@remix-run/node";
import Edit from "../components/Edit";
import { ElementProvider } from "~/components/ElementContext";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function EditPage() {
  return (
    <ElementProvider>
      <Edit/>
    </ElementProvider>
  );
}
