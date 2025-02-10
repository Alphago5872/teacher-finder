import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Find your teacher" },
    { name: "description", content: "Where is my beloved teacher?" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {

    return { teacher: params.teacher };
}

export default function TeacherSchdule() {
  return <h1>Home page</h1>
}