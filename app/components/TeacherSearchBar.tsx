export default function TeacherSearchBar({ style, onChange }: { style: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <div className={`width-full bg-black2 rounded-xl p-4 flex items-center gap-3 ${style}`}>
        <box-icon name='search' color='#B0B0B0'></box-icon>
        <input onChange={onChange} className="outline-none text-white3 self-center w-full" placeholder="Search teachers here"></input>
    </div>
}