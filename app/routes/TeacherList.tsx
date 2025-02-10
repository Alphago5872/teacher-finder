import axios from "axios";
import type { Route } from "./+types/home";
import TeacherCard from "~/components/TeacherCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Find your teacher" },
    { name: "description", content: "Pursue your teacher's current location without their consent here!" },
  ];
}

// export async function clientLoader() {
//   const date = new Date();
//   const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

//   const classes = await axios.get(`https://cors-anywhere.herokuapp.com/https://school-management-api.xeersoft.co.th/api/timetable/date/${dateStr}`, {
//     withCredentials: false,
//   }).then((res) => res.data);

//   const teachers: string[] = [];
//   for (let yClass of classes) {
//     const teacher = yClass.tt_title
//       .split(" by ")
//       [yClass.tt_title.split(" by ").length - 1].split(", ");

//     console.log(yClass);
//     console.log(teacher)
//     teacher.map((t: string) => {
//       if (!teachers.includes(t)) {
//         if (t.startsWith("P'") || t.startsWith("Mr.") || t.startsWith("Ms."))
//         teachers.push(t);
//       }
//     });
//   }

//   return { teacher: teachers };
// }

export default function TeacherList({ loaderData }: Route.ComponentProps) {
  return <div>
    <h1 className="text-center text-4xl mt-4">Teachers List</h1>
    <TeacherCard teacher="Mr. John" />
  </div>
}
