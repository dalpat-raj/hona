import ReviewsCard from '@/app/ui/dashboard/reviews/ReviewsCard'
import { getReviews } from '@/lib/data'

const ReviewsUi = async() => {
    const Allreviews = await getReviews()
    
    return (
        <div className='p-4 mt-4'>
            {
                Allreviews?.map((item,i)=>(
                    <div key={i}>
                        <ReviewsCard reviews={item}/>
                    </div>
                ))
            }
        </div>
    )
}

export default ReviewsUi;
