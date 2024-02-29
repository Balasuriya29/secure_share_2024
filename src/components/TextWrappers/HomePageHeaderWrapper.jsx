import ViewAllContainer from "./ViewAllContainer";

const HomePageHeaderWrapper = ({title,showViewAll}) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='font-[600] text-xl'>{title}</div>
            {showViewAll && <ViewAllContainer/>}
        </div>    
    )
}

export default HomePageHeaderWrapper;