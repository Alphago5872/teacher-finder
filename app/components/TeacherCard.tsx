import { NavLink } from "react-router";

export default function TeacherCard({ teacher }: { teacher: string }) {
    return <NavLink className="width-full bg-black3 rounded-xl p-4 flex items-center gap-3" to={`/teacher/${teacher}`}>
        <box-icon name='chalkboard' color='#B0B0B0'></box-icon>
        <p className="text-white2 self-center">{teacher}</p>
    </NavLink>
}