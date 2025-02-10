import axios from "axios";
import type { Route } from "./+types/home";
import TeacherCard from "~/components/TeacherCard";
import { useState } from "react";
import TeacherSearchBar from "~/components/TeacherSearchBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Find your teacher" },
    { name: "description", content: "Pursue your teacher's current location without their consent here!" },
  ];
}

export async function clientLoader() {
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
  const classes = await axios.get(`https://cors-anywhere.herokuapp.com/https://school-management-api.xeersoft.co.th/api/timetable/date/${dateStr}`, {
    withCredentials: false,
  }).then((res) => res.data);

  const teachers: string[] = [];
  for (let yClass of classes) {
    const teacher = yClass.tt_title
      .split(" by ")
      [yClass.tt_title.split(" by ").length - 1].split(", ");

    teacher.map((t: string) => {
      if (!teachers.includes(t)) {
        if (t.startsWith("P'") || t.startsWith("Mr.") || t.startsWith("Ms.")) {
          teachers.push(t);
        }
        //  else if (t.startsWith("Mr.")) {
        //   teachers.push(t.replace("Mr.", "Mr. "));
        // } else if (t.startsWith("Ms.")) {
        //   teachers.push(t.replace("Ms.", "Ms. "));
        // }
      }
    });
  }

  return { teacher: teachers };
}

export default function TeacherList({ loaderData }: Route.ComponentProps) {
  const teacherNames: string[] = loaderData.teacher;
  
  const [name, setName] = useState("");

  return <div>
    <h1 className="text-center text-4xl mt-8 text-white1">Teachers List</h1>
    <div className="mx-6 my-8 flex flex-col gap-2">
      <TeacherSearchBar style="mb-2" onChange={(e) => setName(e.target.value)} />
      {teacherNames.filter(t => t.toLowerCase().includes(name.toLowerCase())).map(t => <TeacherCard teacher={t} />)}
    </div>
  </div>
}
