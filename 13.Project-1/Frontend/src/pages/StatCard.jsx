const StatCard = ({ title, value, color }) => {
    return (
        <div
            className="
                bg-white
                rounded-xl
                shadow-md
                p-6
                border
                border-amber-50
                hover:shadow-xl
                transition
                duration-300
            "
        >
            <h3 className="text-gray-500 text-sm">
                {title}
            </h3>

            <p className={`text-4xl font-bold mt-2 ${color}`}>
                {value}
            </p>
        </div>
    );
};

export default StatCard;



                        // <div className='bg-white shadow rounded-xl p-6'>
                        //     <h3 className='text-gray-500'>Total Projects</h3>
                        //     <p className='text-3xl font-bold text-purple-600'>{stats.total_projects}</p>
                        // </div>
                        

                        // <div className='bg-white shadow rounded-xl p-6'>
                        //     <h3 className='text-gray-500'>Total Tasks</h3>
                        //     <p className='text-3xl font-bold text-blue-600'>{stats.total_tasks}</p>
                        // </div>

                        // <div className='bg-white shadow rounded-xl p-6'>
                        //     <h3 className='text-gray-500'>Completed Tasks</h3>
                        //     <p className='text-3xl font-bold text-green-600'>{stats.completed_tasks}</p>
                        // </div>

                        // <div className='bg-white shadow rounded-xl p-6'>
                        //     <h3 className='text-gray-500'>Pending Tasks</h3>
                        //     <p className='text-3xl font-bold text-yellow-600'>{stats.pending_tasks}</p>
                        // </div>

                        // <div className='bg-white shadow rounded-xl p-6'>
                        //     <h3 className='text-gray-500'>High Priority Tasks</h3>
                        //     <p className='text-3xl font-bold text-red-600'>{stats.high_priority_tasks}</p>
                        // </div>