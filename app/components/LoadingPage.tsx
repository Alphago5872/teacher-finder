import Johnny from '../assets/johnny.jpg';

export default function TeacherCard() {
    return <div className="w-full h-full fixed top-0 left-0 bg-black1 bg-opacity-60 flex flex-col items-center justify-center z-10">
        <img src={Johnny} alt="Johnny" className="w-3/4 max-w-2xl" />
        <h1 className='mt-8 text-2xl text-white1'>Loading your favorite teacher...</h1>
    </div>
}