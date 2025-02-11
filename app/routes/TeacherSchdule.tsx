import TeacherClassCard from "~/components/TeacherClassCard";
import type { Route } from "./+types/home";
import { NavLink } from "react-router";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Find your teacher" },
    { name: "description", content: "Where is my beloved teacher?" },
  ];
}

type TeacherClassType = { location: string; time: string; subject: string; active: boolean; year: string; };

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  function pad(d: number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
  const classes = await axios.get(`https://cors-anywhere.herokuapp.com/https://school-management-api.xeersoft.co.th/api/timetable/date/${dateStr}`, {
    withCredentials: false,
  }).then((res) => res.data);

  function generateKey(event: TeacherClassType) {
    return `${event.subject}|${event.time}|${event.location}`;
  }
  
  function addUniqueEvent(events: TeacherClassType[], eventSet: Set<string>, newEvent: TeacherClassType) {
    const key = generateKey(newEvent);
    
    if (!eventSet.has(key)) {
      events.push(newEvent);
      eventSet.add(key);
      console.log("Event added successfully!");
    } else {
      console.log("Duplicate event detected! Not adding.");
    }
  }
  
  const teachers: TeacherClassType[] = [];
  const teachersSet: Set<string> = new Set();
  for (let yClass of classes) {
    const activeTeachers = yClass.tt_title
      .split(" by ")
      [yClass.tt_title.split(" by ").length - 1].split(", ");

    const startTime = yClass.tt_time_zone.split(":");
    const endTime = yClass.tt_duration_time.split(":");

    if (activeTeachers.includes(params.teacher)) {
      let obj = {
        location: `${yClass.fl_name} ${yClass.room}`,
        time: `${yClass.tt_time_zone} - ${pad(Number(startTime[0]) + Number(endTime[0]))}:${pad(Number(startTime[1]) + Number(endTime[1]))}:${pad(Number(startTime[2]) + Number(endTime[2]))}`,
        "subject": yClass.tt_title.split(" by ")[0],
        year: yClass.lv_title,
        active: startTime[0] <= date.getHours() && date.getHours() <= Number(startTime[0]) + Number(endTime[0]),
      }
      
      addUniqueEvent(teachers, teachersSet, obj);
    }
  }

  const teacherSort = (t1: TeacherClassType, t2: TeacherClassType) => {
    const t1Start = Number(t1.time.split(' - ')[0].split(":")[0]);
    const t2Start = Number(t2.time.split(' - ')[0].split(":")[0]);

    if (t1Start < t2Start) return -1;
    if (t1Start > t2Start) return 1;
    return 0;
  }

  return { teacher: params.teacher, classes: teachers.sort(teacherSort) };
}

export default function TeacherSchdule({ loaderData }: Route.ComponentProps) {
  const teacherNames: string[] = loaderData.teacher;
  const classData: TeacherClassType[] = loaderData.classes;

  return <div className="relative">
      <NavLink className="flex gap-2 ml-8 absolute" to={'/'}>
      <box-icon name='arrow-back' color='#B0B0B0'></box-icon>
      <p className="text-white2 self-center">Back</p>
      </NavLink>
      <h1 className="text-center text-4xl mt-8 text-white1">{teacherNames}'s</h1>
      <h1 className="text-center text-4xl text-white1">Schedule</h1>
      <div className="mx-6 my-8 flex flex-col gap-2">
        {classData.map(c => <TeacherClassCard class={c.subject} time={c.time} location={c.location} active={c.active} year={c.year} />)}
      </div>
    </div>
}