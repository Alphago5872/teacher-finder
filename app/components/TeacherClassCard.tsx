import { NavLink } from "react-router";

export default function TeacherClassCard(props: { class: string, time: string, location: string, active: boolean, year: string }) {
    return <div className={`width-full bg-black3 rounded-xl p-4 flex flex-col items-start gap-2 ${props.active ? "shadow-white bg-support1" : ""}`}>
        <div className="flex gap-2">
        <box-icon name='chalkboard' type='solid' color='#B0B0B0' ></box-icon>
        <p className="text-white2 self-center">{props.class}</p>
        </div>
        <div className="flex gap-2">
        <box-icon name='time-five' type='solid' color='#B0B0B0'></box-icon>
        <p className="text-white2 self-center">{props.time}</p>
        </div>
        <div className="flex gap-2">
        <box-icon name='current-location' color='#B0B0B0'></box-icon>
        <p className="text-white2 self-center">{props.location}</p>
        </div>
        <div className="flex gap-2">
        <box-icon name='user' color='#B0B0B0'></box-icon>
        <p className="text-white2 self-center">{props.year}</p>
        </div>
    </div>
}